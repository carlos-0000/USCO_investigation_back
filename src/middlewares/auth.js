import jwt from 'jsonwebtoken';
import config from '../config';
import Users, {requiredData} from '../models/Users';
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

export const hasMinimumData = async (request, response, next) => {

    const pass = {}
    requiredData.map(required => pass[required] = !!request.body[required]);

    const missingData = Object.entries(pass).filter(data => (

        data[1] === false &&
        requiredData.includes(data[0])

    ));

    if (missingData.length) {

        let missingDataStr = '';

        missingData.forEach((data, index) => missingDataStr += '"' + data[0] + (

            index !== missingData.length - 1 ? (index !== missingData.length - 2 ? '", ' : '" and ') : '"'

        ));

        return response.status(400).json({errorMessage: 'Missing data: ' + missingDataStr});

    }

    next();

};

export const userExists = async (request, response, next) => {

    const user = await Users.findOne({
        attributes: ['id'],
        where: {documentNumber: request.body.documentNumber}
    });

    if (user) next();

    else return response.status(404).json({
        errorName: 'NOT_FOUND',
        errorMessage: `No user found with document number "${request.body.documentNumber}"`
    });

};

export const userIsNotDeleted = async (request, response, next) => {

    const user = await Users.findOne({
        attributes: ['deleted'],
        where: {documentNumber: request.body.documentNumber}
    });

    if (!user.deleted) next();

    else return response.status(404).json({
        errorName: 'DELETED',
        errorMessage: `The user with document number "${request.params.userId}" has been previously deleted`
    });

};