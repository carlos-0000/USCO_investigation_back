import CivilStatuses from '../models/CivilStatuses';

export const getCivilStatuses = async (request, response) => {
    
    const civilStatuses = await CivilStatuses.findAll();
    
    response.status(200).json(civilStatuses);

}

export const getCivilStatusById = async (request, response) => {

    const civilStatus = await CivilStatuses.findByPk(request.params['civilStatusId']);
    
    response.status(200).json(civilStatus);

}
