const { AppError } = require("../helpers/error");
const { User, Image } = require("../models");

const getSaveImgbyUserIdService = async(user)=>{
    try {
        const userFound = await User.findOne({
            where:{
                id:user.id
            },
        });
        if(!userFound){
            throw new AppError(404,'User not found')
        };
        
        const imgSave = await userFound.getImgSave()
        const data = {
            "userSave": userFound,
            "imgSave":imgSave,          
        }
        return data;
       
    } catch (error) {
        throw error
    }
}
const getCreateImgbyUserIdService = async(user)=>{
    try {
        const userFound = await User.findOne({
            where:{
                id:user.id
            },
            include:'img'
        });
        if(!userFound){
            throw new AppError(404,'User not found')
        };
        return userFound;
    } catch (error) {
        throw error
    }
}
const deleteImgByIdService = async(user,imgId)=>{
    try {
        const imgFound = await Image.findByPk(imgId);
        if(!imgFound){
            throw new AppError(404,'Image not found');
        }
        if(imgFound.userId !== user.id){
            throw new AppError(403,'No permission');
        }
        await Image.destroy({
            where:{
                id:imgId
            }
        });
    } catch (error) {
        throw error;
    }
}
module.exports = {
    getSaveImgbyUserIdService,
    getCreateImgbyUserIdService,
    deleteImgByIdService
}