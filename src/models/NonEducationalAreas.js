import {DataTypes} from 'sequelize';
import db from '../database';
import Municipios from './Municipios';
import NonEducationalEntities from './NonEducationalEntities';

const NonEducationalAreas = db.define('NonEducationalAreas', {
    
    name:                       {type: DataTypes.STRING},
    nonEducationalEntity_id:    {type: DataTypes.BIGINT},
    municipio_id:               {type: DataTypes.BIGINT},
    city:                       {type: DataTypes.STRING},
    inactive:                   {type: DataTypes.BOOLEAN},
    deleted:                    {type: DataTypes.BOOLEAN}
    
}, {
    
    version: false,
    timestamps: false,
    createdAt: false,
    updatedAt: false
    
});

NonEducationalAreas.belongsTo(NonEducationalEntities,   {as: 'nonEducationalEntity',    foreignKey: 'nonEducationalEntity_id'});
NonEducationalAreas.belongsTo(Municipios,               {as: 'municipio',               foreignKey: 'municipio_id'});

export default NonEducationalAreas;