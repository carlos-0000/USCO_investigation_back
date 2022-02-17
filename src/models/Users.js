import bcrypt from 'bcryptjs';
import db from '../database';
import {DataTypes} from 'sequelize';

import Roles from './Roles';
import DocumentTypes from './DocumentTypes';
import CivilStatuses from './CivilStatuses';
import Genders from './Genders';
import EthnicGroups from './EthnicGroups';
import Countries from './Countries';
import Municipios from './Municipios';

const Users = db.define('Users', {
    
    role_id:            {type: DataTypes.BIGINT},
    documentType_id:    {type: DataTypes.BIGINT},
    documentNumber:     {type: DataTypes.STRING},
    password:           {type: DataTypes.STRING},
    firstname:          {type: DataTypes.STRING},
    lastname:           {type: DataTypes.STRING},
    email:              {type: DataTypes.STRING},
    institutionalEmail: {type: DataTypes.STRING},
    country_id:         {type: DataTypes.BIGINT},
    city:               {type: DataTypes.STRING},
    municipio_id:       {type: DataTypes.BIGINT},
    ethnicGroup_id:     {type: DataTypes.BIGINT},
    gender_id:          {type: DataTypes.BIGINT},
    civilStatus_id:     {type: DataTypes.BIGINT},
    deleted:            {type: DataTypes.BOOLEAN}
    
}, {
    
    timestamps: true,
    version: false
    
});

Users.belongsTo(Roles,          {foreignKey: 'role_id',         as: 'role'});
Users.belongsTo(DocumentTypes,  {foreignKey: 'documentType_id', as: 'documentType'});
Users.belongsTo(CivilStatuses,  {foreignKey: 'civilStatus_id',  as: 'civilStatus'});
Users.belongsTo(Genders,        {foreignKey: 'gender_id',       as: 'gender'});
Users.belongsTo(EthnicGroups,   {foreignKey: 'ethnicGroup_id',  as: 'ethnicGroup'});
Users.belongsTo(Countries,      {foreignKey: 'country_id',      as: 'country'});
Users.belongsTo(Municipios,     {foreignKey: 'municipio_id',    as: 'municipio'});



Users.encryptPassword = async password => {

    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);

};

Users.comparePassword = async (password, receivedPassword) => {

    return await bcrypt.compare(password, receivedPassword);

};

export const requiredData = [
    'documentType_id',
    'documentNumber',
    'password'
];

export default Users;