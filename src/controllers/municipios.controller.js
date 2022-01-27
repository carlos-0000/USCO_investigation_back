import Municipios from '../models/Municipios';

export const getMunicipios = async (request, response) => {
    
    const municipios = await Municipios.findAll();
    
    response.json(municipios);

}

export const getMunicipioByCodigo = async (request, response) => {

    const municipio = await Municipios.findOne({
        where: {codigoMunicipio: request.params['codigoMunicipio']}
    });
    
    response.status(200).json(municipio);

}

export const getMunicipiosByDepartamento = async (request, response) => {

    const municipios = await Municipios.findAll({
        attributes: ['codigoMunicipio', 'nombreMunicipio'],
        where: {codigoDepartamento: request.params['codigoDepartamento']}
    });
    
    response.status(200).json(municipios);

}

export const getDepartamentos = async (request, response) => {

    const departamentos = await Municipios.findAll({
        attributes: ['codigoDepartamento', 'nombreDepartamento', 'nombreRegion'],
        group: ['codigoDepartamento']
    });

    response.json(departamentos);

}

export const getDepartamentoByCodigo = async (request, response) => {

    const departamentos = await Municipios.findOne({
        attributes: ['codigoDepartamento', 'nombreDepartamento', 'nombreRegion'],
        where: {codigoDepartamento: request.params['codigoDepartamento']}
    });

    response.json(departamentos);

}