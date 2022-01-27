import {DataTypes} from 'sequelize';
import db from '../database';

const DocumentTypes = db.define('DocumentTypes', {
    
    name: {type: DataTypes.STRING}
    
}, {
    
    version: false,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    
});

export default DocumentTypes;