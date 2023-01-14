const { AppError } = require('../helpers/error');
const {User, Image, sequelize, } = require('../models');
const getAllImageService = async() =>{
    try {
        const dataImage = await Image.findAll();
        return dataImage;
    } catch (error) {
        throw error;
    }
};
const getImageByNameService = async(params)=>{
    try {
        const imageFound = await Image.findAll({
            where:{
                name:sequelize.where(
                    sequelize.fn("LOWER",sequelize.col("ten_hinh")),
                    "LIKE",
                    "%" + params + "%"
                )
            }
        })
        if(!imageFound){
            imageFound = await Image.findAll();
            return imageFound;
        }
        return imageFound;
    } catch (error) {
        throw error;
    }
};
module.exports = {
    getAllImageService,
    getImageByNameService
};