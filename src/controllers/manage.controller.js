const { response } = require('../helpers/response');
const manageService = require('../services/manage.service');

const getProfile = () =>{
    return (req,res,next)=>{
        try {
          const {user} = res.locals;
          res.status(200).json(response(user));
        } catch (error) {
          next(error);
        }
      }
};
const getSaveImgByUserId = () =>{
  return async(req,res,next)=>{
      try {
          const {user} = res.locals
          const imgSave = await manageService.getSaveImgbyUserIdService(user);
          res.status(200).json(response(imgSave))
      } catch (error) {
        console.log(error);
          next(error)
      }
  }
}
const getCreateImgByUserId = () =>{
  return async(req,res,next)=>{
      try {
          const {user} = res.locals
          const imgCreate = await manageService.getCreateImgbyUserIdService(user);
          res.status(200).json(response(imgCreate))
      } catch (error) {
        console.log(error);
          next(error)
      }
  }
}
const deleteImgById = ()=>{
  return async(req,res,next)=>{
      try {
          const {imgId} = req.params;
          const {user} = res.locals
          await manageService.deleteImgByIdService(user,imgId);
          res.status(200).json(response("Ok"))
      } catch (error) {
          next(error);
      }
  }
}
module.exports = {
    getProfile,
    getSaveImgByUserId,
    getCreateImgByUserId,
    deleteImgById
}