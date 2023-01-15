const { AppError } = require("../helpers/error");
const { response } = require("../helpers/response");
const imageService = require("../services/image.service");
const addImage = () => {
    return async (req,res,next)=>{
        
        const {user} = res.locals;
        const file = req.file;
        const {desc} = req.body;
        if(!file){
            next(new AppError(400,'Missing file'));
        };
        const imageAdd = await imageService.addImgService(user,file,desc)
        res.status(200).json(response(imageAdd));
    };
};

module.exports = {
    addImage,
};