import NonEducationalEntities from '../models/NonEducationalEntities';
import Countries from '../models/Countries';
import Municipios from '../models/Municipios';
import {Op} from 'sequelize';

const 
    
    nonEducationalEntitiesAttributes = [ // For queries
        'id',
        'name',
        'nit',
        'company',
        'city',
    ],
    
    nonEducationalEntitiesColumns = [ // From request
        'name',
        'nit',
        'company',
        'country_id',
        'municipio_id',
        'city'
    ],
    
    nonEducationalEntitiesIncludes = [
        {model: Countries, attributes: ['id', 'name'], as: 'country'},
        {model: Municipios, attributes: ['id', 'name', 'code'], as: 'municipio'},
    ];

export const getNonEducationalEntities = async (request, response) => {

    const entities = await NonEducationalEntities.findAll({
        attributes: nonEducationalEntitiesAttributes,
        include: nonEducationalEntitiesIncludes,
        where: {deleted: {[Op.not]: true}}
    });

    response.json(entities);
    
};

export const getNonEducationalEntityById = async (request, response) => {

    const nonEducationalEntity = await NonEducationalEntities.findOne({
        where: {id: request.params.nonEducationalEntityId},
        attributes: nonEducationalEntitiesAttributes,
        include: nonEducationalEntitiesIncludes
    });

    if (nonEducationalEntity) response.json(nonEducationalEntity);
    else response.status(400).json({message: `User with id ${request.params.nonEducationalEntityId} not found`});
    
};

export const createNonEducationalEntity = async (request, response) => {

    console.log('createNonEducationalEntity');
    
    try {

        const build = NonEducationalEntities.build();

        for (const column of nonEducationalEntitiesColumns) {
            
            if (request.body[column]) build[column] = request.body[column];

        }

        const createdEducationalEntity = await build.save();

        console.log({createdEducationalEntity});

        const createdUser = await NonEducationalEntities.findOne({
            where: {id: createdEducationalEntity.id},
            attributes: nonEducationalEntitiesAttributes,
            include: nonEducationalEntitiesIncludes
        });

        return response.status(201).json(createdUser);
        
    } catch (error) {

        return response.status(500).json({
            errorName: error.name,
            errorMessage: error.original.sqlMessage
        })
        
    }
    
};

export const updateNonEducationalEntityById = async (request, response) => {

    try {

        const data = {};

        for (const column of nonEducationalEntitiesColumns) {

            if (request.body[column]) data[column] = request.body[column];

        }
        
        await NonEducationalEntities.update(
            data,
            {where: {id: request.params.nonEducationalEntityId}}
        );
        
        const updatedUser = await NonEducationalEntities.findOne({
            where: {id: request.params.nonEducationalEntityId},
            attributes: nonEducationalEntitiesAttributes,
            include: nonEducationalEntitiesIncludes
        });

        return response.status(200).json(updatedUser);

    } catch (error) {

        response.status(500).json({
            errorName: error.name,
            errorMessage: error.original.sqlMessage
        })

    }
    
};

export const deleteNonEducationalEntityById = async (request, response) => {
    
    try {
        
        await NonEducationalEntities.update(
            {deleted: true},
            {where: {id: request.params.nonEducationalEntityId}}
        );
        
        response.status(200).json({
            message: 'The Non Educational Entity with id "' + request.params.nonEducationalEntityId + 
                '" has been flagged as deleted successfully'
        });
        
    } catch (error) {

        response.status(500).json({
            errorName: error.name,
            errorMessage: error.original.sqlMessage
        })
        
    }
    
};