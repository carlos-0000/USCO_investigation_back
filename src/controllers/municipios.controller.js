import Municipios from '../models/Municipios';
import Departamentos from '../models/Departamentos';

const

    municipiosAttributes = ['id', 'name', 'code'],
    municipiosIncludes = [{model: Departamentos, attributes: ['id', 'name', 'code', 'region_id'], as: 'departamento'}];

export const getMunicipios = async (request, response) => {
    
    const municipios = await Municipios.findAll({
        attributes: municipiosAttributes,
        include: municipiosIncludes
    });
    
    response.json(municipios);

}

export const getMunicipioById = async (request, response) => {

    const municipio = await Municipios.findOne({
        attributes: municipiosAttributes,
        include: municipiosIncludes,
        where: {id: request.params['municipioId']}
    });
    
    response.status(200).json(municipio);

}

export const getMunicipiosByDepartamentoId = async (request, response) => {

    const municipios = await Municipios.findAll({
        attributes: municipiosAttributes,
        include: municipiosIncludes,
        where: {departamento_id: request.params['departamentoId']}
    });
    
    response.status(200).json(municipios);

}