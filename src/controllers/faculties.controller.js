import Faculties from '../models/Faculties';
import Municipios from '../models/Municipios';
import {Op} from 'sequelize';
import EducationalEntities from '../models/EducationalEntities';

const 
    
    facultiesAttributes = [ // For queries
        'id',
        'name',
        'city',
        'inactive',
        'deleted'
    ],
    
    facultiesColumns = [ // From request
        'id',
        'name',
        'educationalEntity_id',
        'municipio_id',
        'city'
    ],
    
    facultiesIncludes = [
        {model: EducationalEntities,    attributes: ['id', 'name'],         as: 'educationalEntity'},
        {model: Municipios,             attributes: ['id', 'name', 'code'], as: 'municipio'}
    ];

export const getFaculties = async (request, response) => {

    const faculties = await Faculties.findAll({
        attributes: facultiesAttributes,
        include: facultiesIncludes,
        where: {deleted: {[Op.not]: true}}
    });

    response.json(faculties);
    
};

export const getFacultyById = async (request, response) => {

    const entity = await Faculties.findOne({
        where: {id: request.params.facultyId},
        attributes: facultiesAttributes,
        include: facultiesIncludes
    });

    if (entity) response.json(entity);
    else response.status(400).json({message: `Faculty with id ${request.params.facultyId} not found`});
    
};

export const createFaculty = async (request, response) => {
    
    try {

        const build = Faculties.build();

        for (const column of facultiesColumns) {
            
            if (request.body[column]) build[column] = request.body[column];

        }

        const createdFaculty = await build.save();

        const updatedFaculty = await Faculties.findOne({
            where: {id: createdFaculty.id},
            attributes: facultiesAttributes,
            include: facultiesIncludes
        });

        return response.status(201).json(updatedFaculty);
        
    } catch (error) {

        return response.status(500).json({
            errorName: error.name,
            errorMessage: error.original.sqlMessage
        })
        
    }
    
};

export const updateFacultyById = async (request, response) => {

    try {

        const data = {};

        for (const column of facultiesColumns) {

            if (request.body[column]) data[column] = request.body[column];

        }
        
        await Faculties.update(
            data,
            {where: {id: request.params.facultyId}}
        );
        
        const updatedFaculty = await Faculties.findOne({
            where: {id: request.params.facultyId},
            attributes: facultiesAttributes,
            include: facultiesIncludes
        });

        return response.status(200).json(updatedFaculty);

    } catch (error) {

        response.status(500).json({
            errorName: error.name,
            errorMessage: error.original.sqlMessage
        })

    }
    
};

export const deleteFacultyById = async (request, response) => {
    
    try {
        
        await Faculties.update(
            {deleted: true},
            {where: {id: request.params.facultyId}}
        );
        
        response.status(200).json({
            message: 'The Faculty with id "' + request.params.facultyId + 
                '" has been flagged as deleted successfully'
        });
        
    } catch (error) {

        response.status(500).json({
            errorName: error.name,
            errorMessage: error.original.sqlMessage
        })
        
    }
    
};