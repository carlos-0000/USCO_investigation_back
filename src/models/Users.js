import bcrypt from 'bcryptjs';

import db from '../database';
import {DataTypes} from 'sequelize';
import User_Roles from './User_Roles';

const Users = db.define('Users', {
    
    username: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    nombres: {type: DataTypes.STRING},
    apellidos: {type: DataTypes.STRING},
    correoInstitucional: {type: DataTypes.STRING},
    numeroDocumento: {type: DataTypes.STRING},
    idCountry: {type: DataTypes.BIGINT},
    
}, {
    
    timestamps: true,
    version: false
    
});

Users.hasMany(User_Roles, {foreignKey: 'user_id', as: 'roles'});


Users.encryptPassword = async password => {

    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);

};

Users.comparePassword = async (password, receivedPassword) => {

    return await bcrypt.compare(password, receivedPassword);

};


export default Users;