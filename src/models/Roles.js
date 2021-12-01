import {DataTypes} from 'sequelize';
import db from '../database';

export const ROLES = ["user", "admin", "moderator"];

const Roles = db.define('Roles', {
    
    name: {type: DataTypes.STRING,},
    
}, {
    
    version: false,
    
});

export default Roles;
