const { AppError } = require('../helpers/error');
const { response } = require('../helpers/response');
const detailService = require('../services/details.service');

const getDetailById = () =>{
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
const getCommentByImgId = () =>{
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
const saveCmt = () => {
    return async(req,res,next)=>{
        try {
            const {imgId,cmt} = req.body
            const {user} = res.locals
            const saveCmt = await detailService.saveCmtService(user,imgId,cmt)
            res.status(200).json(response(saveCmt))
        } catch (error) {
            next(error)
        }
    }
}


module.exports = {
    getDetailById,
    getCommentByImgId,
    checkSavedImg,
    saveCmt
}