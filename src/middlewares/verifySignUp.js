import Users from '../models/Users';

export const checkDuplicateUsernameOrEmail = async (request, response, next) => {
  
    const user = await Users.findOne({where: {username: request.body.username}});
    if (user) return response.status(400).json({message: `The username "${request.body.username}" already exist`});
    
    const email = await Users.findOne({where: {email: request.body.email}});
    if (email) return response.status(400).json({message: `The email "${request.body.email}" already exist`});
    
    next();
    
}