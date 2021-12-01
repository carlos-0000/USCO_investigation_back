import Product from '../models/Products';

export const createProducts = async (request, response) => {
    
    const {name, category, price, imgURL} = request.body;

    const productSaved = await Product.create({name, category, price, imgURL});

    response.status(201).json(productSaved);

}

export const getProducts = async (request, response) => {
    
    const products = await Product.findAll();
    
    response.json(products);

}

export const getProductById = async (request, response) => {

    const product = await Product.findByPk(request.params['productId']);
    
    response.status(200).json(product);

}

export const updateProductById = async (request, response) => {

    const productId = request.params['productId']
    
    await Product.update(request.body, {
        where: {id: productId}
    });
    
    const updatedProduct = await Product.findOne({where: {id: productId}});
    
    response.status(200).json(updatedProduct);

}

export const deleteProductById = async (request, response) => {

    await Product.destroy({where: {id: request.params['productId']}});
    response.status(204).json();

}