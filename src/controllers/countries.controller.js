import Countries from '../models/Countries';

/*export const createCountriess = async (request, response) => {
    
    const {name, category, price, imgURL} = request.body;

    const productSaved = await Countries.create({name, category, price, imgURL});

    response.status(201).json(productSaved);

}*/

export const getCountries = async (request, response) => {
    
    const countries = await Countries.findAll();
    
    response.json(countries);

}

export const getCountryById = async (request, response) => {

    const country = await Countries.findByPk(request.params['countryId']);
    
    response.status(200).json(country);

}

/*
export const updateCountriesById = async (request, response) => {

    const productId = request.params['productId']
    
    await Countries.update(request.body, {
        where: {id: productId}
    });
    
    const updatedCountries = await Countries.findOne({where: {id: productId}});
    
    response.status(200).json(updatedCountries);

}

export const deleteCountriesById = async (request, response) => {

    await Countries.destroy({where: {id: request.params['productId']}});
    response.status(204).json();

}*/
