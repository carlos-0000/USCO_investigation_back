import Users from '../models/Users';
import Roles from '../models/Roles';
import jwt from 'jsonwebtoken';
import config from '../config';

export const signUp = async (request, response) => {
    
    const {
        password,
        firstname,
        lastname,
        institutionalEmail,
        documentType,
        documentNumber,
        country_id
    } = request.body;
    
    const savedUser = await Users.create({
        username: documentNumber,
        firstname,
        lastname,
        institutionalEmail,
        documentType,
        documentNumber,
        country_id,
        password: await Users.encryptPassword(password),
        role_id: 2 // Role by default (user)
    })
    
    const token = jwt.sign(
        {id: savedUser._id},
        config.SECRET,
        {expiresIn: 86400} // 1 day in seconds
    )
    
    response.json({
        token,
        id: savedUser._id,
        role: savedUser.role
    });
    
};

export const signIn = async (request, response) => {

    const userFound = await Users.findOne({
        attributes: ['id', 'username', 'password', 'role_id'],
        where: {username: request.body.username},
        include: [{
            model: Roles,
            attributes: ['id', 'name'],
            as: 'role'
        }]
    });
    
    if (!userFound) return response.status(400).json({message: 'User not found'});
    
    const matchPassword = await Users.comparePassword(request.body.password, userFound.password);
    if (!matchPassword) return response.status(401).json({token: null, message: 'Invalid password'});

    const token = jwt.sign(
        {id: userFound.id},
        config.SECRET,
        {expiresIn: 86400}, // 1 day in seconds
    )
    
    response.json({
        token,
        role: userFound.role
    });
    
};
