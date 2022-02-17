import EducationalEntities from '../models/EducationalEntities';
import Countries from '../models/Countries';
import Municipios from '../models/Municipios';
import {Op} from 'sequelize';

const 
    
    educationalEntitiesAttributes = [ // For queries
        'id',
        'name',
        'nit',
        'foundationYear',
        'city',
    ],
    
    educationalEntitiesColumns = [ // From request
        'name',
        'nit',
        'foundationYear',
        'country_id',
        'municipio_id',
        'city'
    ],
    
    educationalEntitiesIncludes = [
        {model: Countries, attributes: ['id', 'name'], as: 'country'},
        {model: Municipios, attributes: ['id', 'name', 'code'], as: 'municipio'},
    ];

export const getEducationalEntities = async (request, response) => {

    const entities = await EducationalEntities.findAll({
        attributes: educationalEntitiesAttributes,
        include: educationalEntitiesIncludes,
        where: {deleted: {[Op.not]: true}}
    });

    response.json(entities);
    
};

export const getEducationalEntityById = async (request, response) => {

    const entity = await EducationalEntities.findOne({
        where: {id: request.params.educationalEntityId},
        attributes: educationalEntitiesAttributes,
        include: educationalEntitiesIncludes
    });

    if (entity) response.json(entity);
    else response.status(400).json({message: `Educational Entity with id ${request.params.educationalEntityId} not found`});
    
};

export const createEducationalEntity = async (request, response) => {
    
    try {

        const build = EducationalEntities.build();

        for (const column of educationalEntitiesColumns) {
            
            if (request.body[column]) build[column] = request.body[column];

        }

        const createdEducationalEntity = await build.save();

        const updatedEducationalEntity = await EducationalEntities.findOne({
            where: {id: createdEducationalEntity.id},
            attributes: educationalEntitiesAttributes,
            include: educationalEntitiesIncludes
        });

        return response.status(201).json(updatedEducationalEntity);
        
    } catch (error) {

        console.log({error});

        return response.status(500).json({
            errorName: error.name,
            errorMessage: error.original.sqlMessage
        })
        
    }
    
};

export const updateEducationalEntityById = async (request, response) => {

    try {

        const data = {};

        for (const column of educationalEntitiesColumns) {

            if (request.body[column]) data[column] = request.body[column];

        }
        
        await EducationalEntities.update(
            data,
            {where: {id: request.params.educationalEntityId}}
        );
        
        const updatedEducationalEntity = await EducationalEntities.findOne({
            where: {id: request.params.educationalEntityId},
            attributes: educationalEntitiesAttributes,
            include: educationalEntitiesIncludes
        });

        return response.status(200).json(updatedEducationalEntity);

    } catch (error) {

        response.status(500).json({
            errorName: error.name,
            errorMessage: error.original.sqlMessage
        })

    }
    
};

export const deleteEducationalEntityById = async (request, response) => {
    
    try {
        
        await EducationalEntities.update(
            {deleted: true},
            {where: {id: request.params.educationalEntityId}}
        );
        
        response.status(200).json({
            message: 'The Educational Entity with id "' + request.params.educationalEntityId + 
                '" has been flagged as deleted successfully'
        });
        
    } catch (error) {

        response.status(500).json({
            errorName: error.name,
            errorMessage: error.original.sqlMessage
        })
        
    }
    
};