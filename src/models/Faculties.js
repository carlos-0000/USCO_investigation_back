import {DataTypes} from 'sequelize';
import db from '../database';
import Municipios from './Municipios';
import EducationalEntities from './EducationalEntities';

const Faculties = db.define('Faculties', {
    
    name:                   {type: DataTypes.STRING},
    educationalEntity_id:   {type: DataTypes.BIGINT},
    municipio_id:           {type: DataTypes.BIGINT},
    city:                   {type: DataTypes.STRING},
    inactive:               {type: DataTypes.BOOLEAN},
    deleted:                {type: DataTypes.BOOLEAN}
    
}, {
    
    version: false,
    timestamps: false,
    createdAt: false,
    updatedAt: false
    
});

Faculties.belongsTo(EducationalEntities,    {as: 'educationalEntity',   foreignKey: 'educationalEntity_id'});
Faculties.belongsTo(Municipios,             {as: 'municipio',           foreignKey: 'municipio_id'});

export default Faculties;