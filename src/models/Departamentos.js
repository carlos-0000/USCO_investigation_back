import {DataTypes} from 'sequelize';
import db from '../database';
import Regiones from './Regiones';

const Departamentos = db.define('Departamentos', {
    
    name:     {type: DataTypes.STRING},
    code:     {type: DataTypes.INTEGER},
    region_id:  {type: DataTypes.BIGINT}
    
}, {
    
    version: false,
    timestamps: false,
    createdAt: false,
    updatedAt: false
    
});

Departamentos.belongsTo(Regiones, {foreignKey: 'region_id', as: 'region'});

export default Departamentos;