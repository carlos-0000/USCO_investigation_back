import Users from '../models/Users';
import Roles from '../models/Roles';
import DocumentTypes from '../models/DocumentTypes';
import Countries from '../models/Countries';
import CivilStatuses from '../models/CivilStatuses';
import Genders from '../models/Genders';
import EthnicGroups from '../models/EthnicGroups';

export const getUsers = async (request, response) => {

    const products = await Users.findAll({
        attributes: [
            'username',
            'email',
            'firstname',
            'lastname',
            'institutionalEmail',
            'documentNumber',
        ],
        include: [{
            model: Roles,
            attributes: ['id', 'name'],
            as: 'role'
        },{
            model: DocumentTypes,
            attributes: ['id', 'name'],
            as: 'documentType'
        },{
            model: Countries,
            attributes: ['id', 'name'],
            as: 'country'
        },{
            model: CivilStatuses,
            attributes: ['id', 'name'],
            as: 'civilStatus'
        },{
            model: Genders,
            attributes: ['id', 'name'],
            as: 'gender'
        },{
            model: EthnicGroups,
            attributes: ['id', 'name'],
            as: 'ethnicGroup'
        }]
    });

    response.json(products);
    
};

export const getUserById = async (request, response) => {

    const user = await Users.findOne({
        where: {id: request.params.userIdToGet},
        attributes: [
            'username',
            'email',
            'firstname',
            'lastname',
            'institutionalEmail',
            'documentNumber',
        ],
        include: [{
            model: Roles,
            attributes: ['id', 'name'],
            as: 'role'
        },{
            model: DocumentTypes,
            attributes: ['id', 'name'],
            as: 'documentType'
        },{
            model: Countries,
            attributes: ['id', 'name'],
            as: 'country'
        },{
            model: CivilStatuses,
            attributes: ['id', 'name'],
            as: 'civilStatus'
        },{
            model: Genders,
            attributes: ['id', 'name'],
            as: 'gender'
        },{
            model: EthnicGroups,
            attributes: ['id', 'name'],
            as: 'ethnicGroup'
        }]
    });

    if (user) response.json(user);
    else response.status(400).json({message:`User with id ${request.params.userIdToGet} not found`});
    
};

export const createUser = async (request, response) => {
    
    try {
        
        const {username, email, password, roles} = request.body;

        const rolesFound = await Roles.findAll({where: {name: roles}});

        // creating a new User
        const user = Users.build({
            username,
            email,
            password,
            roles: 'rolesFound.map((role) => role._id)',
        });

        // encrypting password
        user.password = await Users.encryptPassword(user.password);

        // saving the new user
        const savedUser = await user.save();

        return response.status(200).json({
            id: savedUser.id,
            username: savedUser.username,
            email: savedUser.email,
            roles: savedUser.roles,
        });
        
    } catch (error) {
        
        console.error(error);
        
    }
    
};


export const getUser = async (request, response) => {};
