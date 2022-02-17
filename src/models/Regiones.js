import {DataTypes} from 'sequelize';
import db from '../database';

const Regiones = db.define('Regiones', {
    
    nombre: {type: DataTypes.STRING},
    
}, {
    
    version: false,
    timestamps: false,
    createdAt: false,
    updatedAt: false
    
});

export default Regiones;