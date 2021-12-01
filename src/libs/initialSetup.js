import Roles from '../models/Roles';

export const createRoles = async () => {
    
    try {
        
        const count = await Roles.count();
        
        if (count > 0) {

            console.log('Roles are already created');
            return;
            
        }

        console.log('Creating roles...');
        await Promise.all([
            Roles.create({name: 'user'}),
            Roles.create({name: 'moderator'}),
            Roles.create({name: 'admin'})
        ])
    
    } catch (error) {

        console.error(error);
        
    }
    
}