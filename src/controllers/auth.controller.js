import Users from '../models/Users';
import Roles from '../models/Roles';
import User_Roles from '../models/User_Roles';
import jwt from 'jsonwebtoken';
import config from '../config';

export const signUp = async (request, response) => {
    
    const {
        email,
        password,
        nombres,
        apellidos,
        roles,
        correoInstitucional,
        numeroDocumento,
        idCountry
    } = request.body;
    
    const savedUser = await Users.create({
        username: numeroDocumento,
        email,
        nombres,
        apellidos,
        correoInstitucional,
        numeroDocumento,
        idCountry,
        password: await Users.encryptPassword(password)
    })
    
    let insertRoles
    
    if (roles) {
        
        const foundRoles = await Roles.findAll({where: {name: roles}});
        insertRoles = foundRoles.map(role => User_Roles.create({
            user_id: savedUser.id,
            role_id: role.id
        }));
        
    } else {
        
        const role = await Roles.findOne({where: {name: 'user'}});
        insertRoles = [User_Roles.create({
            user_id: savedUser.id,
            role_id: role.id
        })]
        
    }
    
    await Promise.all(insertRoles);
    
    const token = jwt.sign(
        {id: savedUser._id},
        config.SECRET,
        {expiresIn: 86400} // 1 day in seconds
    )
    
    response.json({token});
    
};

export const signIn = async (request, response) => {

    // response.header("Access-Control-Allow-Origin", "*");
    // response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // response.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if ('OPTIONS' === request.method) return response.status(200).json('');

    const userFound = await Users.findOne({where: {email: request.body.email}});
    if (!userFound) return response.status(400).json({message: 'User not found'});
    
    const matchPassword = await Users.comparePassword(request.body.password, userFound.password);
    if (!matchPassword) return response.status(401).json({token: null, message: 'Invalid password'});
    
    const token = jwt.sign({id: userFound.id}, config.SECRET, {
        expiresIn: 86400, // 1 day in seconds
    })
    
    response.json({token});
    
};
