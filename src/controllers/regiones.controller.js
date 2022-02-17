import Regiones from '../models/Regiones';

const

    regionesAttributes = ['id', 'name'];

export const getRegiones = async (request, response) => {

    const regiones = await Regiones.findAll({
        attributes: regionesAttributes,
    });

    response.json(regiones);

}

export const getRegionById = async (request, response) => {

    const region = await Regiones.findOne({
        attributes: regionesAttributes,
        where: {id: request.params['regionId']}
    });

    response.json(region);

}