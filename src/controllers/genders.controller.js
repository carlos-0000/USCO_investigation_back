import Genders from '../models/Genders';

export const getGenders = async (request, response) => {
    
    const genders = await Genders.findAll();
    
    response.status(200).json(genders);

}

export const getGenderById = async (request, response) => {

    const gender = await Genders.findByPk(request.params['genderId']);
    
    response.status(200).json(gender);

}
