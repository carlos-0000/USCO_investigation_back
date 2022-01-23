import Users from '../models/Users';
import Roles from '../models/Roles';
import User_Roles from '../models/User_Roles';

export const getUsers = async (request, response) => {

    const products = await Users.findAll({
        attributes: [
            'id',
            'username',
            'email',
            'nombres',
            'apellidos',
            'correoInstitucional',
            'numeroDocumento',
            'idCounty',
            'createdAt',
            'updatedAt'
        ],
        include: [{
            model: User_Roles,
            attributes: ['role_id'],
            as: 'roles'
        }]
    });

    response.json(products);
    
};

export const getUserById = async (request, response) => {

    const product = await Users.findOne({
        attributes: [
            'id',
            'username',
            'email',
            'nombres',
            'apellidos',
            'correoInstitucional',
            'numeroDocumento',
            'idCounty',
            'createdAt',
            'updatedAt'
        ],
        where: {id: request.params.userIdToGet},
        include: [{
            model: User_Roles,
            attributes: ['role_id'],
            as: 'roles'
        }]
    });

    response.json(product);
    
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
