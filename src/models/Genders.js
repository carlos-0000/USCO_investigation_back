import {DataTypes} from 'sequelize';
import db from '../database';

const Genders = db.define('Genders', {
    
    name: {type: DataTypes.STRING}
    
}, {
    
    version: false,
    timestamps: false,
    createdAt: false,
    updatedAt: false
    
});

export default Genders;