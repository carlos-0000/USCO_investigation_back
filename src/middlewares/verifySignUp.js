import {ROLES} from '../models/Role';
import User from '../models/User';

export const checkDuplicateUsernameOrEmail = async (request, response, next) => {
  
    const user = await User.findOne({username: request.body.username});
    if (user) return response.status(400).json({message: `The username "${request.body.username}" already exist`});
    
    const email = await User.findOne({email: request.body.email});
    if (email) return response.status(400).json({message: `The email "${request.body.email}" already exist`});
    
    next();
    
}

export const checkRolesExisted = (request, response, next) => {
    
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