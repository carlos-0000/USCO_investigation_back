import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';

export const signUp = async (req, res) => {
    
    const {username, email, password, roles} = req.body;
    
    const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    })
    
    if (roles) {
        const foundRoles = await Role.find({name: {$in: roles}});
        newUser.roles = foundRoles.map(role => role._id);
    } else {
        const role = await Role.findOne({name: 'user'});
        newUser.roles = [role._id];
    }
    
    const savedUser = await newUser.save();
    
    const token = jwt.sign(
        {id: savedUser._id},
        config.SECRET,
        {expiresIn: 86400} // 1 day in seconds
    )
    
    res.json({token});
    
};

export const signIn = async (request, response) => {
    
    const userFound = await User.findOne({email: request.body.email}).populate('roles');
    if (!userFound) return response.status(400).json({message: 'User not found'});
    
    const matchPassword = await User.comparePassword(request.body.password, userFound.password);
    if (!matchPassword) return response.status(401).json({token: null, message: 'Invalid password'});
    
    const token = jwt.sign({id: userFound._id}, config.SECRET, {
        expiresIn: 86400, // 1 day in seconds
    })
    
    response.json({token});
    
};
