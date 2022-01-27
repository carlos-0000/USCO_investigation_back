import EthnicGroups from '../models/EthnicGroups';

export const getEthnicGroups = async (request, response) => {
    
    const ethnicGroups = await EthnicGroups.findAll();
    
    response.status(200).json(ethnicGroups);

}

export const getEthnicGroupById = async (request, response) => {

    const ethnicGroup = await EthnicGroups.findByPk(request.params['ethnicGroupId']);
    
    response.status(200).json(ethnicGroup);

}
