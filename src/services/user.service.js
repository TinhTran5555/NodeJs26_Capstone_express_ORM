const { AppError } = require("../helpers/error");
const { User, Image } = require("../models");


const updateUserService = async(requester,user)=>{
    try {
        
        const requesterFound = await User.findOne({
            where:{
                id:requester.id
            }
        })
        const userFound = await User.findOne({
            where:{
                id:user.id
            }
        })
        if(!requesterFound){
            throw new AppError(404,'Requester not found')
        }
        if(!userFound){
            throw new AppError(404,'User not found')
        }
        if(requester.id !== user.id){
            throw new AppError(403,"No permission")
        }
        console.log("proto img",requesterFound.save());
        await requesterFound.update(user)
        return requesterFound
    } catch (error) {      
        throw error
    }
}
module.exports = {
    updateUserService
}