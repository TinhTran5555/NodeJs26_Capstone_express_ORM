const { response } = require('../helpers/response');
const userService = require('../services/user.service');




const updateUser = () => {
    return async(req,res,next)=>{
        try {
            const { user: requester} = res.locals
            const user  = req.body
            const updateUser = await userService.updateUserService(requester, user)
            res.status(200).json(response(updateUser));    
        } catch (error) {
            next(error)
        }
    }
}
module.exports = {
    updateUser
}