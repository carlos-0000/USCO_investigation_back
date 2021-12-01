import {ROLES} from '../models/Roles';
import Users from '../models/Users';

export const checkDuplicateUsernameOrEmail = async (request, response, next) => {

    // response.header("Access-Control-Allow-Origin", "*");
    // response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // response.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  
    const user = await Users.findOne({where: {username: request.body.username}});
    if (user) return response.status(400).json({message: `The username "${request.body.username}" already exist`});
    
    const email = await Users.findOne({where: {email: request.body.email}});
    if (email) return response.status(400).json({message: `The email "${request.body.email}" already exist`});
    
    next();
    
}

export const checkRolesExisted = (request, response, next) => {

    // response.header("Access-Control-Allow-Origin", "*");
    // response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // response.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    
    const roles = request.body.roles;
    
    if (roles) {

        for (let i = 0; i < roles.length; i++) {
            
            if (!ROLES.includes(roles[i])) return response.status(400).json({
                message: `Role ${roles[i]} does not exist`
            })
            
        }
        
    }
    
    next();
  
}