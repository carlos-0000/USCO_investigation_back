import {DataTypes} from 'sequelize';
import db from '../database';

const TiposDocumentos = db.define('TiposDocumentos', {
    
    name: {type: DataTypes.STRING,},
    // category: {type: DataTypes.STRING},
    // price: {type: DataTypes.NUMBER},
    // imgURL: {type: DataTypes.STRING},
    
}, {
    
    // timestamps: true,
    version: false,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,

    // If don't want createdAt
    createdAt: false,

    // If don't want updatedAt
    updatedAt: false,
    
});

export default TiposDocumentos;