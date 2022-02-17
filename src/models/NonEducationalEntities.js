import db from '../database';
import {DataTypes} from 'sequelize';
import Countries from './Countries';
import Municipios from './Municipios';

const NonEducationalEntities = db.define('NonEducationalEntities', {
    
    name:               {type: DataTypes.STRING},
    nit:                {type: DataTypes.STRING},
    company:            {type: DataTypes.STRING},
    country_id:         {type: DataTypes.BIGINT},
    municipio_id:       {type: DataTypes.BIGINT},
    city:               {type: DataTypes.STRING},
    inactive:           {type: DataTypes.BOOLEAN},
    deleted:            {type: DataTypes.BOOLEAN}
    
}, {

    version: false,
    timestamps: false,
    createdAt: false,
    updatedAt: false
    
});

NonEducationalEntities.belongsTo(Countries, {as: 'country', foreignKey: 'country_id'});
NonEducationalEntities.belongsTo(Municipios, {as: 'municipio', foreignKey: 'municipio_id'});

export default NonEducationalEntities;