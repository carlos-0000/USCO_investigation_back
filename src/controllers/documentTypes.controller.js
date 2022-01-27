import DocumentTypes from '../models/DocumentTypes';

export const getDocumentTypes = async (request, response) => {
    
    const documentTypes = await DocumentTypes.findAll();
    
    response.status(200).json(documentTypes);

}

export const getDocumentTypeById = async (request, response) => {

    const documentType = await DocumentTypes.findByPk(request.params['documentTypeId']);
    
    response.status(200).json(documentType);

}
