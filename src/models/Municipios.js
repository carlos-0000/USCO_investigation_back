import {DataTypes} from 'sequelize';
import db from '../database';
import Departamentos from './Departamentos';

const Municipios = db.define('Municipios', {
    
    name:             {type: DataTypes.STRING},
    code:             {type: DataTypes.INTEGER},
    departamento_id:    {type: DataTypes.BIGINT},
    
}, {
    
    version: false,
    timestamps: false,
    createdAt: false,
    updatedAt: false
    
});

Municipios.belongsTo(Departamentos, {as: 'departamento', foreignKey: 'departamento_id'})

export default Municipios;