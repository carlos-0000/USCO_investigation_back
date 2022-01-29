import jwt from 'jsonwebtoken';
import config from '../config';
import Users from '../models/Users';
import Roles, {ROLES} from '../models/Roles';

export const verifyToken = async (request, response, next) => {
    
    try {

        const token = request.headers.authorization;
        if (!token) return response.status(403).json({message: 'No token provided'});
        
        const decoded = jwt.verify(token, config.SECRET);
        request.userId = decoded.id
    
        const user = await Users.findOne({where: {id: request.userId}});
        if (!user) return response.status(404).json({message: 'No user found'});
    
        next();
        
    } catch (error) {

        return response.status(401).json({errorMessage: 'Unauthorized'});
        
    }

}

    export const hasAtLeastRole = async (request, response, next, roleName) => {
    
    try {
        
        const user = await Users.findOne({
            where: {id: request.userId},
            attributes: [],
            include: [{
                model: Roles,
                attributes: ['name', 'hierarchy'],
                as: 'role'
            }]
        });
    
        const roles = await Roles.findAll({
            attributes: ['name', 'hierarchy']
        });
        
        const roleToCheck = roles.filter(role => role['name'] === roleName)[0];
        
        if (user.role['hierarchy'] <= roleToCheck['hierarchy']) next();
        else return response.status(401).json({errorMessage: 'Unauthorized'});
        
    } catch (error) {

        return response.status(401).json({errorMessage: 'Unauthorized'})
        
    }

}

export const isAtLeastSuperAdmin = async (request, response, next) => await hasAtLeastRole(request, response, next, ROLES['SuperAdmin']);
export const isAtLeastAdmin = async (request, response, next) => await hasAtLeastRole(request, response, next, ROLES['Admin']);
export const isAtLeastModerator = async (request, response, next) => await hasAtLeastRole(request, response, next, ROLES['Moderator']);
export const isAtLeastUser = async (request, response, next) => await hasAtLeastRole(request, response, next, ROLES['User']);