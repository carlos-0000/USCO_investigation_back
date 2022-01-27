import {DataTypes} from 'sequelize';
import db from '../database';

const Municipios = db.define('Municipios', {
    
    nombreMunicipio: {type: DataTypes.STRING},
    codigoMunicipio: {type: DataTypes.NUMBER},
    nombreDepartamento: {type: DataTypes.STRING},
    codigoDepartamento: {type: DataTypes.NUMBER},
    nombreRegion: {type: DataTypes.STRING}
    
}, {
    
    version: false,
    // don't add the timestamp attributes (updatedAt, createdAt)
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    
});

export default Municipios;