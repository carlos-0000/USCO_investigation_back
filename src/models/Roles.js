import {DataTypes} from 'sequelize';
import db from '../database';

export const ROLES = {
    SuperAdmin: 'SuperAdmin',
    Admin: 'Admin',
    Moderator: 'Moderator',
    User: 'User'
};

const Roles = db.define('Roles', {
    
    name: {type: DataTypes.STRING},
    hierarchy: {type: DataTypes.NUMBER},
    description: {type: DataTypes.STRING},
    alias: {type: DataTypes.STRING}
    
}, {
    
    version: false
    
});

export default Roles;
