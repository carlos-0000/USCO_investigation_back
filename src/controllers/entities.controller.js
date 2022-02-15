import Entities from '../models/Entities';
import Countries from '../models/Countries';
import {Op} from 'sequelize';

const 
    
    entityAttributes = [ // For queries
        'id',
        'name',
        'nit',
        'foundationYear',
        'company',
        'codigoDepartamento',
        'codigoMunicipio',
        'city',
        'isEducational',
        'inactive',
        'deleted'
    ],
    
    entityColumns = [ // From request
        'name',
        'nit',
        'foundationYear',
        'company',
        'country_id',
        'codigoDepartamento',
        'codigoMunicipio',
        'city'
    ],
    
    entityIncludes = [
        {model: Countries, attributes: ['id', 'name'], as: 'country'}
    ];

/* Educational Entities */

export const getEducationalEntities = async (request, response) => {

    const entities = await Entities.findAll({
        attributes: entityAttributes,
        include: entityIncludes,
        where: {
            deleted: {[Op.not]: true},
            isEducational: true
        }
    });

    response.json(entities);
    
};

export const getEducationalEntityById = async (request, response) => {

    const entity = await Entities.findOne({
        where: {
            id: request.params.entityId,
            isEducational: true
        },
        attributes: entityAttributes,
        include: entityIncludes
    });

    if (entity) response.json(entity);
    else response.status(400).json({message: `User with id ${request.params.entityId} not found`});
    
};

export const createEducationalEntity = async (request, response) => {
    
    try {

        const build = Entities.build({
            isEducational: true
        });

        for (const column of entityColumns) {
            
            if (request.body[column]) build[column] = request.body[column];

        }

        const createdUser = await build.save();

        const updatedUser = await Entities.findOne({
            where: {id: createdUser.id},
            attributes: entityAttributes,
            include: entityIncludes
        });

        return response.status(201).json(updatedUser);
        
    } catch (error) {

        return response.status(500).json({
            errorName: error.name,
            errorMessage: error.original.sqlMessage
        })
        
    }
    
};

export const updateEducationalEntityById = async (request, response) => {

    try {

        const data = {};

        for (const column of entityColumns) {

            if (request.body[column]) data[column] = request.body[column];

        }
        
        await Entities.update(
            data,
            {where: {id: request.params.entityId}}
        );
        
        const updatedUser = await Entities.findOne({
            where: {id: request.params.entityId},
            attributes: entityAttributes,
            include: entityIncludes
        });

        return response.status(200).json(updatedUser);

    } catch (error) {

        response.status(500).json({
            errorName: error.name,
            errorMessage: error.original.sqlMessage
        })

    }
    
};

export const deleteEducationalEntityById = async (request, response) => {
    
    try {
        
        await Entities.update(
            {deleted: true},
            {where: {id: request.params.entityId}}
        );
        
        response.status(200).json({
            message: 'The entity with id "' + request.params.entityId + '" has been flagged as deleted successfully'
        });
        
    } catch (error) {

        response.status(500).json({
            errorName: error.name,
            errorMessage: error.original.sqlMessage
        })
        
    }
    
};


/* No Educational Entities */

export const getNonEducationalEntities = async (request, response) => {

    const entities = await Entities.findAll({
        attributes: entityAttributes,
        include: entityIncludes,
        where: {
            deleted: {[Op.not]: true},
            isEducational: false
        }
    });

    response.json(entities);
    
};

export const getNonEducationalEntityById = async (request, response) => {

    const entity = await Entities.findOne({
        where: {
            id: request.params.entityId,
            isEducational: false
        },
        attributes: entityAttributes,
        include: entityIncludes
    });

    if (entity) response.json(entity);
    else response.status(400).json({message: `User with id ${request.params.entityId} not found`});
    
};

export const createNonEducationalEntity = async (request, response) => {
    
    try {

        const build = Entities.build({
            isEducational: false
        });

        for (const column of entityColumns) {
            
            if (request.body[column]) build[column] = request.body[column];

        }

        const createdUser = await build.save();

        const updatedUser = await Entities.findOne({
            where: {id: createdUser.id},
            attributes: entityAttributes,
            include: entityIncludes
        });

        return response.status(201).json(updatedUser);
        
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

        for (const column of entityColumns) {

            if (request.body[column]) data[column] = request.body[column];

        }
        
        await Entities.update(
            data,
            {where: {id: request.params.entityId}}
        );
        
        const updatedUser = await Entities.findOne({
            where: {id: request.params.entityId},
            attributes: entityAttributes,
            include: entityIncludes
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
        
        await Entities.update(
            {deleted: true},
            {where: {id: request.params.entityId}}
        );
        
        response.status(200).json({
            message: 'The entity with id "' + request.params.entityId + '" has been flagged as deleted successfully'
        });
        
    } catch (error) {

        response.status(500).json({
            errorName: error.name,
            errorMessage: error.original.sqlMessage
        })
        
    }
    
};