import {DataTypes} from 'sequelize';
import db from '../database';

const Products = db.define('Products', {
    
    name: {type: DataTypes.STRING,},
    category: {type: DataTypes.STRING},
    price: {type: DataTypes.NUMBER},
    imgURL: {type: DataTypes.STRING},
    
}, {
    
    timestamps: true,
    version: false
    
});

export default Products;