import Roles from '../models/Roles';

export const getRoles = async (request, response) => {
    
    const roles = await Roles.findAll({
        attributes: ['id', 'label']
    });
    
    response.status(200).json(roles);

}

export const getRoleById = async (request, response) => {

    const role = await Roles.findOne({
        attributes: ['id', 'label'],
        where: {id: request.params['roleId']}
    });
    
    response.status(200).json(role);

}
