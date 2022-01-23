import TiposDocumentos from '../models/TiposDocumentos';

/*export const createTiposDocumentoss = async (request, response) => {
    
    const {name, category, price, imgURL} = request.body;

    const productSaved = await TiposDocumentos.create({name, category, price, imgURL});

    response.status(201).json(productSaved);

}*/

export const getTiposDocumentos = async (request, response) => {
    
    const tiposDocumentos = await TiposDocumentos.findAll();
    
    response.json(tiposDocumentos);

}

export const getTipoDocumentoById = async (request, response) => {

    const tipoDocumento = await TiposDocumentos.findByPk(request.params['tipoDocumentoId']);
    
    response.status(200).json(tipoDocumento);

}

/*
export const updateTiposDocumentosById = async (request, response) => {

    const productId = request.params['productId']
    
    await TiposDocumentos.update(request.body, {
        where: {id: productId}
    });
    
    const updatedTiposDocumentos = await TiposDocumentos.findOne({where: {id: productId}});
    
    response.status(200).json(updatedTiposDocumentos);

}

export const deleteTiposDocumentosById = async (request, response) => {

    await TiposDocumentos.destroy({where: {id: request.params['productId']}});
    response.status(204).json();

}*/
