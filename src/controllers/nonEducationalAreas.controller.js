import {Op} from 'sequelize';
import NonEducationalAreas from '../models/NonEducationalAreas';
import NonEducationalEntities from '../models/NonEducationalEntities';
import Municipios from '../models/Municipios';

const 
    
    nonEducationalAttributes = [ // For queries
        'id',
        'name',
        'city',
        'inactive',
        'deleted'
    ],
    
    nonEducationalColumns = [ // From request
        'name',
        'nonEducationalEntity_id',
        'municipio_id',
        'city'
    ],
    
    nonEducationalIncludes = [
        {model: NonEducationalEntities, attributes: ['id', 'name'],                             as: 'nonEducationalEntity'},
        {model: Municipios,             attributes: ['id', 'name', 'code', 'departamento_id'],  as: 'municipio'}
    ];

export const getNonEducationalAreas = async (request, response) => {

    const nonEducationalArea = await NonEducationalAreas.findAll({
        attributes: nonEducationalAttributes,
        include: nonEducationalIncludes,
        where: {deleted: {[Op.not]: true}}
    });

    response.json(nonEducationalArea);
    
};

export const getNonEducationalAreaById = async (request, response) => {

    const nonEducationalArea = await NonEducationalAreas.findOne({
        where: {id: request.params.nonEducationalAreaId},
        attributes: nonEducationalAttributes,
        include: nonEducationalIncludes
    });

    if (nonEducationalArea) response.json(nonEducationalArea);
    else response.status(400).json({
        message: `Non-Educational Area with id ${request.params.nonEducationalAreaId} not found`
    });
    
};

export const createNonEducationalArea = async (request, response) => {
    
    try {

        const build = NonEducationalAreas.build();

        for (const column of nonEducationalColumns) {
            
            if (request.body[column]) build[column] = request.body[column];

        }

        const createdNonEducationalArea = await build.save();

        const updatedNonEducationalArea = await NonEducationalAreas.findOne({
            where: {id: createdNonEducationalArea.id},
            attributes: nonEducationalAttributes,
            include: nonEducationalIncludes
        });

        return response.status(201).json(updatedNonEducationalArea);
        
    } catch (error) {

        return response.status(500).json({
            errorName: error.name,
            errorMessage: error.original.sqlMessage
        })
        
    }
    
};

export const updateNonEducationalAreaById = async (request, response) => {

    try {

        const data = {};

        for (const column of nonEducationalColumns) {

            if (request.body[column]) data[column] = request.body[column];

        }
        
        await NonEducationalAreas.update(
            data,
            {where: {id: request.params.nonEducationalAreaId}}
        );
        
        const updatedNonEducationalArea = await NonEducationalAreas.findOne({
            where: {id: request.params.nonEducationalAreaId},
            attributes: nonEducationalAttributes,
            include: nonEducationalIncludes
        });

        return response.status(200).json(updatedNonEducationalArea);

    } catch (error) {

        response.status(500).json({
            errorName: error.name,
            errorMessage: error.original.sqlMessage
        })

    }
    
};

export const deleteNonEducationalAreaById = async (request, response) => {
    
    try {
        
        await NonEducationalAreas.update(
            {deleted: true},
            {where: {id: request.params.nonEducationalAreaId}}
        );
        
        response.status(200).json({
            message: 'The Non-Educational Area with id "' + request.params.nonEducationalAreaId + 
                '" has been flagged as deleted successfully'
        });
        
    } catch (error) {

        response.status(500).json({
            errorName: error.name,
            errorMessage: error.original.sqlMessage
        })
        
    }
    
};