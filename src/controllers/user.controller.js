import Users from '../models/Users';
import Roles from '../models/Roles';
import DocumentTypes from '../models/DocumentTypes';
import Countries from '../models/Countries';
import CivilStatuses from '../models/CivilStatuses';
import Genders from '../models/Genders';
import EthnicGroups from '../models/EthnicGroups';
import {Op} from 'sequelize';
import Municipios from '../models/Municipios';

const 
    
    userAttributes = [ // For queries
        'id',
        'documentNumber',
        'firstname',
        'lastname',
        'email',
        'institutionalEmail',
        'city',
    ],
    
    userColumns = [ // From request
        'role_id',
        'documentType_id',
        'documentNumber',
        'password',
        'firstname',
        'lastname',
        'email',
        'institutionalEmail',
        'country_id',
        'city',
        'municipio_id',
        'ethnicGroup_id',
        'gender_id',
        'civilStatus_id'
    ],
    
    userIncludes = [
        {model: Roles,          attributes: ['id', 'label'],                            as: 'role'},
        {model: DocumentTypes,  attributes: ['id', 'name'],                             as: 'documentType'},
        {model: Countries,      attributes: ['id', 'name'],                             as: 'country'},
        {model: EthnicGroups,   attributes: ['id', 'name'],                             as: 'ethnicGroup'},
        {model: Genders,        attributes: ['id', 'name'],                             as: 'gender'},
        {model: CivilStatuses,  attributes: ['id', 'name'],                             as: 'civilStatus'},
        {model: Municipios,     attributes: ['id', 'name', 'code', 'departamento_id'],  as: 'municipio'}
    ];

export const getUsers = async (request, response) => {

    const users = await Users.findAll({
        attributes: userAttributes,
        include: userIncludes,
        where: {deleted: {[Op.not]: true}}
    });

    response.json(users);
    
};

export const getUserById = async (request, response) => {

    const user = await Users.findOne({
        where: {id: request.params.userId},
        attributes: userAttributes,
        include: userIncludes
    });

    if (user) response.json(user);
    else response.status(400).json({message: `User with id ${request.params.userId} not found`});
    
};

export const createUser = async (request, response) => {
    
    try {

        const build = Users.build({});

        for (const column of userColumns) {
            
            if (request.body[column]) {
                
                build[column] = column === 'password' ? 
                    await Users.encryptPassword(request.body[column]) : 
                    request.body[column];
                
            }
            
        }

        const createdUser = await build.save();

        const updatedUser = await Users.findOne({
            where: {id: createdUser.id},
            attributes: userAttributes,
            include: userIncludes
        });

        return response.status(201).json(updatedUser);
        
    } catch (error) {

        return response.status(500).json({
            errorName: error.name,
            errorMessage: error.original.sqlMessage
        })
        
    }
    
};

export const updateUserById = async (request, response) => {

    try {

        const data = {};

        for (const column of userColumns) {

            if (request.body[column]) {

                data[column] = column === 'password' ? 
                    await Users.encryptPassword(request.body[column]) : 
                    request.body[column];

            }

        }
        
        await Users.update(
            data,
            {where: {id: request.params.userId}}
        );
        
        const updatedUser = await Users.findOne({
            where: {id: request.params.userId},
            attributes: userAttributes,
            include: userIncludes
        });

        return response.status(200).json(updatedUser);

    } catch (error) {

        response.status(500).json({
            errorName: error.name,
            errorMessage: error.original.sqlMessage
        })

    }
    
};

export const deleteUserById = async (request, response) => {
    
    try {
        
        await Users.update(
            {deleted: true},
            {where: {id: request.params.userId}}
        );
        
        response.status(200).json({
            message: 'The user with id "' + request.params.userId + '" has been flagged as deleted successfully'
        });
        
    } catch (error) {

        response.status(500).json({
            errorName: error.name,
            errorMessage: error.original.sqlMessage
        })
        
    }
    
};