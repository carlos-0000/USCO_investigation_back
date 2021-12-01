import jwt from 'jsonwebtoken';
import config from '../config';
import Users from '../models/Users';
import Roles from '../models/Roles';
import User_Roles from '../models/User_Roles';

export  const verifyToken = async (request, response, next) => {

    // response.header("Access-Control-Allow-Origin", "*");
    // response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // response.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
    try {

        const token = request.headers.authorization;
        if (!token) return response.status(403).json({message: 'No token provided'});
    
        // TODO: verify valid token
        const decoded = jwt.verify(token, config.SECRET);
        request.userId = decoded.id
    
        const user = await Users.findOne({where: {id: request.userId}});
        if (!user) return response.status(404).json({message: 'No user found'});
    
        next();
        
    } catch (error) {
        
        return response.status(401).json({message: 'Unauthorized'})
        
    }

}

// TODO avoid repeated code
export const isModerator = async (request, response, next) => {

    // response.header("Access-Control-Allow-Origin", "*");
    // response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // response.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  
    let userRoles = await User_Roles.findAll({attributes: ['role_id'], where: {user_id: request.userId}});
    userRoles = userRoles.map(result => result['role_id']);
    
    const userRolesNames = await Roles.findAll({attributes: ['name'], where: {id: userRoles}})
    
    const hasModeratorRole = userRolesNames.findIndex(role => role['name'] === 'moderator') >= 0;
    if (!hasModeratorRole) return response.status(403).json({message: 'The "moderator" role is required for this action'});
    
    next();
    
}

export const isAdmin = async (request, response, next) => {

    // response.header("Access-Control-Allow-Origin", "*");
    // response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // response.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    let userRoles = await User_Roles.findAll({attributes: ['role_id'], where: {user_id: request.userId}});
    userRoles = userRoles.map(result => result['role_id']);

    const userRolesNames = await Roles.findAll({attributes: ['name'], where: {id: userRoles}})

    const hasModeratorRole = userRolesNames.findIndex(role => role['name'] === 'admin') >= 0;
    if (!hasModeratorRole) return response.status(403).json({message: 'The "admin" role is required for this action'});

    next();
  
}