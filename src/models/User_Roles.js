import {DataTypes} from 'sequelize';
import db from '../database';

const User_Roles = db.define('User_Roles', {
    
    user_id: {type: DataTypes.INTEGER},
    role_id: {type: DataTypes.INTEGER},
    
}, {
    
    timestamps: true,
    version: false
    
});

export default User_Roles;