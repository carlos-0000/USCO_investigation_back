import {DataTypes} from 'sequelize';
import db from '../database';

const EthnicGroups = db.define('EthnicGroups', {
    
    name: {type: DataTypes.STRING},
    description: {type: DataTypes.STRING}
    
}, {
    
    version: false,
    timestamps: false,
    createdAt: false,
    updatedAt: false
    
});

export default EthnicGroups;