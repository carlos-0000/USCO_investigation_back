import Users, {requiredData} from '../models/Users';
import {isAtLeastAdmin} from './auth';

const dataInColumnAlreadyExist = async (request, response, next, data, column) => {
    
    const where = {};
    where[column] = data;

    const user = await Users.findOne({where});
    
    if (user) {
        return response.status(400).json({
            errorMessage: `The ${column} "${data}" already exist`
        });
    }

    next();

};

export const emailAlreadyExist = async (request, response, next) => {
    return await dataInColumnAlreadyExist(request, response, next, request.body.email, 'email');
};

export const documentNumberAlreadyExist = async (request, response, next) => {
    return await dataInColumnAlreadyExist(request, response, next, request.body.documentNumber, 'documentNumber');
};

export const institutionalEmailAlreadyExist = async (request, response, next) => {
    return await dataInColumnAlreadyExist(request, response, next, request.body.institutionalEmail, 'institutionalEmail');
};

export const isAdminOrOwner = async (request, response, next) => {
    
    if (request.params.userId === request.userId) {
        console.log('isAdminOrOwner if');
        next();
    }
    else {
        console.log('isAdminOrOwner else');
        return isAtLeastAdmin(request, response, next);
    }

};

export const userAlreadyExist = async (request, response, next) => {

    const user = await Users.findOne({
        where: {id: request.params.userId}
    });
    
    if (user) next();
    else response.status(400).json({errorMessage: `There is no user with id "${request.params.userId}"`});
    
};

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

export const userIsNotDeleted = async (request, response, next) => {

    const user = await Users.findOne({
        attributes: ['deleted'],
        where: {id: request.params.userId}
    });

    if (!user.deleted) next();
    else response.status(404).json({
        errorMessage: `The user with the id "${request.params.userId}" has been previously deleted`
    });
    
};