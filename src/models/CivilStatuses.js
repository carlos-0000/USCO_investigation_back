import {DataTypes} from 'sequelize';
import db from '../database';

const CivilStatuses = db.define('CivilStatuses', {
    
    name: {type: DataTypes.STRING}
    
}, {
    
    version: false,
    timestamps: false,
    createdAt: false,
    updatedAt: false
    
});

export default CivilStatuses;