import Users from '../models/Users';
import Roles from '../models/Roles';
import jwt from 'jsonwebtoken';
import config from '../config';

export const register = async (request, response) => {
    
    try {

        const {
            password,
            firstname,
            lastname,
            institutionalEmail,
            documentType_id,
            documentNumber,
            country_id
        } = request.body;

        const savedUser = await Users.create({
            firstname,
            lastname,
            institutionalEmail,
            documentType_id,
            documentNumber,
            country_id,
            password: await Users.encryptPassword(password),
            role_id: 2 // default
        });

        const token = jwt.sign(
            {id: savedUser.id},
            config.SECRET,
            {expiresIn: 86400} // 1 day in seconds
        );
        
        const role = await Roles.findOne({
            attributes: ['id', 'label'],
            where: {id: savedUser.role_id}
        });

        response.status(201).json({
            token,
            id: savedUser.id,
            role,
        });
        
    } catch (error) {
        
        response.status(500).json({
            errorName: error.name,
            errorMessage: error.original.sqlMessage
        })
        
    }
    
};

export const login = async (request, response) => {

    const userFound = await Users.findOne({
        attributes: ['id', 'password'],
        where: {documentNumber: request.body.documentNumber},
        include: [{
            model: Roles,
            attributes: ['id', 'label'],
            as: 'role'
        }]
    });
    
    const matchPassword = await Users.comparePassword(request.body.password, userFound.password);
    if (!matchPassword) return response.status(401).json({
        errorName: 'UNAUTHORIZED', 
        errorMessage: 'Invalid password'
    });

    const token = jwt.sign(
        {id: userFound.id},
        config.SECRET,
        {expiresIn: 86400}, // 1 day in seconds
    )
    
    response.json({
        token,
        role: userFound.role,
        id: userFound.id
    });
    
};
