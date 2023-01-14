const { AppError } = require('../helpers/error');
const { response } = require('../helpers/response');
const detailService = require('../services/details.service');

const getDetailbyId = () =>{
    return async(req,res,next)=>{
        try {
            const {imgId} = req.params;
            const dataImage = await detailService.getDetailByIdService(imgId);
            res.status(200).json(response(dataImage));
        } catch (error) {
            next(error);
        }
    }
}
const getCommentbyImgId = () =>{
    return async(req,res,next)=>{
        try {
            const {imgId} = req.params;
            const dataImage = await detailService.getCommentByImgIdService(imgId)
            res.status(200).json(response(dataImage))
        } catch (error) {
            next(error)
        }
    }
}
const checkSavedImg = () =>{
    return async(req,res,next)=>{
        try {
            const {imgId} = req.params
            const {user} = res.locals
            const checkSave = await detailService.checkSavedImgService(user,imgId)
            res.status(200).json(response(checkSave))
        } catch (error) {
            next(error)
        }
    }
}


module.exports = {
    getDetailbyId,
    getCommentbyImgId,
    checkSavedImg
}