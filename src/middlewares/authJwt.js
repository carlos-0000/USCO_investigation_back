import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/User';
import Role from '../models/Role';

export  const verifyToken = async (request, response, next) => {
    
    try {

        const token = request.headers.authorization;
        if (!token) return response.status(403).json({message: 'No token provided'});
    
        // TODO: verify valid token
        const decoded = jwt.verify(token, config.SECRET);
        request.userId = decoded.id
    
        const user = await User.findById(request.userId, {password: 0});
        if (!user) return response.status(404).json({message: 'No user found'});
    
        next();
        
    } catch (error) {
        
        return response.status(401).json({message: 'Unauthorized'})
        
    }

}

// TODO avoid repeated code
export const isModerator = async (request, response, next) => {
  
    const user = await User.findById(request.userId);
    const roles = await Role.find({_id: {$in: user.roles}});

    const hasModeratorRole = roles.findIndex(role => role.name === 'moderator') >= 0;
    
    if (!hasModeratorRole) return response.status(403).json({message: 'The "moderator" role is required for this action'});
    
    next();
    
}

export const isAdmin = async (request, response, next) => {

    const user = await User.findById(request.userId);
    const roles = await Role.find({_id: {$in: user.roles}});

    const hasModeratorRole = roles.findIndex(role => role.name === 'admin') >= 0;

    if (!hasModeratorRole) return response.status(403).json({message: 'The "admin" role is required for this action'});

    next();
  
}