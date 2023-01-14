const { AppError } = require('../helpers/error');
const {Image,sequelize, User} = require('../models');

const getDetailByIdService = async(imgId)=>{
    try {
        const dataImg = await Image.findByPk(imgId,{
            include:"user",
        })
        if(!dataImg){
            throw new AppError(404,'image or user not found');
        }
        return dataImg;
    } catch (error) {
        throw error;
    }
}
const getCommentByImgIdService = async(imgId)=>{
    try {
        const dataImage = await Image.findOne({
            where:{
                id:imgId
            }
        })
        if(!dataImage){
            throw new AppError(404,"image not found");
        }
            // console.log('Img proto',dataImage.__proto__);
        const userCmt = await dataImage.getUserComment({
            attributes:{
                exclude:['role'],
            },
        });
        
        return {
            userCmt,
            dataImage
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}
const checkSavedImgService = async(user, imgId)=>{
    try {
        let msg = ''
        let img = null
        let hasSave = false
        const userFound = await User.findOne({
            where:{
                id:user.id
            }
        })
        if(!userFound){
            throw new AppError(404,'User not found')
        }
        const imgFound = await Image.findOne({
            where:{
                id:imgId
            }
        }); 
        if(!imgFound){
            throw new AppError(404,'Image not found')
        }
        const checked = await userFound.hasImgSave(Number(imgId)) 
        console.log(imgId);
        if(checked){
            msg="Image has been saved"
            img = imgFound
            hasSave = true
        }else
        {
            msg="Image has not been saved"
            img = null
            hasSave = false
        }
        return {msg,img,hasSave}
    } catch (error) {
        console.log(error);
        throw error
    }
}
module.exports = {
    getDetailByIdService, 
    getCommentByImgIdService,
    checkSavedImgService
};