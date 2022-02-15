import db from '../database';
import {DataTypes} from 'sequelize';
import Countries from './Countries';

const Entities = db.define('Entities', {
    
    name:               {type: DataTypes.STRING},
    nit:                {type: DataTypes.STRING},
    foundationYear:     {type: DataTypes.INTEGER},
    company:            {type: DataTypes.STRING},
    country_id:         {type: DataTypes.BIGINT},
    codigoDepartamento: {type: DataTypes.INTEGER},
    codigoMunicipio:    {type: DataTypes.INTEGER},
    city:               {type: DataTypes.STRING},
    isEducational:      {type: DataTypes.BOOLEAN},
    inactive:           {type: DataTypes.BOOLEAN},
    deleted:            {type: DataTypes.BOOLEAN}
    
}, {

    version: false,
    timestamps: false,
    createdAt: false,
    updatedAt: false
    
});

Entities.belongsTo(Countries,      {foreignKey: 'country_id', as: 'country'});

export default Entities;