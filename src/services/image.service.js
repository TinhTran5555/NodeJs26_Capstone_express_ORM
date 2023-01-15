const { AppError } = require('../helpers/error');
const {Image,sequelize, User} = require('../models');


const addImgService = async(user,file,desc)=>{
    try {
        const userFound = await User.findOne({
            where:{
                id:user.id
            }
        })
        if(!userFound){
            throw new AppError(404,"User not found")
        }
         file.path = file.path.replace(/\\/g,'/');
        const url = `http://localhost:4000/${file.path}`;
        const addImage = await Image.create({
            name:file.filename,
            link:url,
            description:desc?desc:"",
            userId:user.id
        })
        return addImage
    } catch (error) {
        throw error
    }
}
module.exports = {
    addImgService
};