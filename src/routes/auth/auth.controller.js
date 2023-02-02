const User = require('../../models/user.mongo');

async function login(req,res){
    // search for email and password in the request body
    const {email, password} = req.body;
    // If email and password are not supplied, throw error
    if(!email || !password){
        return res.status(400).json({msg: 'Please provide valid email and password'});
    }
    // look for the email that's provided
    const user = await User.findOne({email});
    // If email doesn't exist, throw error
    if(!user){
        return res.status(401).json({msg: 'This user does not exist'});
    }
    // If email exists, then check if the password matches
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        return res.status(401).json({msg: 'Pleae provide correct password details'});
    }
    // If email exists and password is correct, then create a token for that session
    const token = user.createJWT()
    return res.status(200).json({user: {name: user.name}, token});
}

async function register(req,res){
    try{
        const user = await User.create({...req.body});
        const token = user.createJWT();
        res.status(201).json({ user: {name: user.name, email: user.email}, token});
    }
    catch(error){
        res.status(500).json({ msg:error });
    }
}

module.exports = { login, register }
