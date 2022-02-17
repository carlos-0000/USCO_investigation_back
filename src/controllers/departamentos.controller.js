import Departamentos from '../models/Departamentos';
import Regiones from '../models/Regiones';

const
    
    departamentosAttributes = ['id', 'name', 'code'],
    departamentosIncludes = [{model: Regiones, attributes: ['id', 'name'], as: 'region'}];

export const getDepartamentos = async (request, response) => {

    const departamentos = await Departamentos.findAll({
        attributes: departamentosAttributes,
        include: departamentosIncludes
    });

    response.json(departamentos);

}

export const getDepartamentoById = async (request, response) => {

    const departamento = await Departamentos.findOne({
        attributes: departamentosAttributes,
        include: departamentosIncludes,
        where: {id: request.params['departamentoId']}
    });

    response.json(departamento);

}