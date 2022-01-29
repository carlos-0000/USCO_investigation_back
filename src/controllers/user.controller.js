import Users from '../models/Users';
import Roles from '../models/Roles';
import DocumentTypes from '../models/DocumentTypes';
import Countries from '../models/Countries';
import CivilStatuses from '../models/CivilStatuses';
import Genders from '../models/Genders';
import EthnicGroups from '../models/EthnicGroups';
import {Op} from 'sequelize';

const 
    
    userAttributes = [
        'id',
        'email',
        'firstname',
        'lastname',
        'institutionalEmail',
        'documentNumber',
    ],
    
    userIncludes = [
        {model: Roles,          attributes: ['id', 'label'],    as: 'role'},
        {model: DocumentTypes,  attributes: ['id', 'name'],     as: 'documentType'},
        {model: Countries,      attributes: ['id', 'name'],     as: 'country'},
        {model: CivilStatuses,  attributes: ['id', 'name'],     as: 'civilStatus'},
        {model: Genders,        attributes: ['id', 'name'],     as: 'gender'},
        {model: EthnicGroups,   attributes: ['id', 'name'],     as: 'ethnicGroup'}
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

        for (const column of [
            'documentNumber',
            'password',
            'firstname',
            'lastname',
            'institutionalEmail',
            'email',
            'documentType_id',
            'country_id',
            'role_id',
            'civilStatus_id',
            'ethnicGroup_id',
            'gender_id'
        ]) {
            if (request.body[column]) {
                if (column === 'password') {
                    build[column] = await Users.encryptPassword(request.body[column]);
                } else {
                    build[column] = request.body[column];
                }
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

        for (const column of [
            'documentNumber',
            'password',
            'firstname',
            'lastname',
            'institutionalEmail',
            'email',
            'documentType_id',
            'country_id',
            'role_id',
            'civilStatus_id',
            'ethnicGroup_id',
            'gender_id'
        ]) {
            if (request.body[column]) {
                if (column === 'password') {
                    data[column] = await Users.encryptPassword(request.body[column]);
                } else {
                    data[column] = request.body[column];
                }
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
        )
        
        response.status(200).json({message: `The user with id "${request.params.userId}" has been deleted successfully`});
        
    } catch (error) {

        response.status(500).json({
            errorName: error.name,
            errorMessage: error.original.sqlMessage
        })
        
    }
    
};