const { User } = require("../models");
const { AppError } = require("../helpers/error");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/jwt");

const login = async(credentials) =>{
    try {
        const {email,password} = credentials;
        const user = await User.findOne({
            where:{
                email
            },
            attributes:{
                include:['password'],
            },
        });
        if(!user){
            throw new AppError(400,'Email or password invalid');
        };
        const isMatched = bcrypt.compareSync(password,user.password);
        if(!isMatched){
            throw new AppError(400,'Email or password invalid');
        };
        return generateToken(user);
        
    } catch (error) {
        throw error;
    }
};
const register = async(data)=>{
    try {
        const userFound = await User.findOne({
            where:{
                email:data.email,
            }
        })
        if(userFound){
            throw new AppError(401,"email is existed")
        }
        const createdUser = await User.create(data)
        return createdUser;
    } catch (error) {
        throw error
    }
}

module.exports = {
    login,
    register
};