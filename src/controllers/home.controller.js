const { AppError } = require('../helpers/error');
const { response } = require('../helpers/response');
const homeService = require('../services/home.service');
const getAllImage = () =>{
    return async(req,res,next)=>{
        try {
            const dataImage = await homeService.getAllImageService();
            res.status(200).json(response(dataImage));
        } catch (error) {
            next(error);
        }
    }
}
const getImageByName = () =>{
    return async(req,res,next)=>{
        try {
            const {name} = req.params
            const dataImageByName = await homeService.getImageByNameService(name)
            res.status(200).json(response(dataImageByName));
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    getAllImage,
    getImageByName
}