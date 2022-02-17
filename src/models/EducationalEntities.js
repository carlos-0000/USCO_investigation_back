import db from '../database';
import {DataTypes} from 'sequelize';
import Countries from './Countries';
import Municipios from './Municipios';

const EducationalEntities = db.define('EducationalEntities', {
    
    name:               {type: DataTypes.STRING},
    nit:                {type: DataTypes.STRING},
    foundationYear:     {type: DataTypes.INTEGER},
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

EducationalEntities.belongsTo(Countries, {as: 'country', foreignKey: 'country_id'});
EducationalEntities.belongsTo(Municipios, {as: 'municipio', foreignKey: 'municipio_id'});

export default EducationalEntities;