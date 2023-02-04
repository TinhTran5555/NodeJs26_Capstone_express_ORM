const express = require('express');
const authorization = require('../../middlewares/auth');
const reqRole = require("../../middlewares/requireRole");
const upload = require('../../middlewares/upload');


const authController = require('../../controllers/auth.controller');
const homeController = require('../../controllers/home.controller');
const manageController = require('../../controllers/manage.controller');
const detailsController = require('../../controllers/details.controller');
const imageController = require('../../controllers/image.controller');
const userController = require('../../controllers/user.controller');
const v1 = express.Router();
// Đăng nhập, đăng ký
v1.post('/login',authController.login());
v1.post("/register",authController.register());
// HomePage
v1.get('/home',homeController.getAllImage()); 
v1.get('/home/:name',homeController.getImageByName());
// DetailsPage
v1.get('/detail/:imgId',detailsController.getDetailById())
v1.get('/comment/:imgId',detailsController.getCommentByImgId())
v1.get('/checksaveimg/:imgId',authorization,detailsController.checkSavedImg())
v1.post('/savecmt',authorization,detailsController.saveCmt())
// ManagePage
v1.get('/profile',authorization,manageController.getProfile());
v1.get('/profile/imgsave',authorization,manageController.getSaveImgByUserId())
v1.get('/profile/imgcreate',authorization,manageController.getCreateImgByUserId())
v1.delete('/profile/delete/:imgId',authorization,manageController.deleteImgById());
// AddImagePage
v1.post('/addimg',authorization,upload.single('file'),imageController.addImage());
// UserPage
v1.put('/user',authorization,userController.updateUser());

module.exports = v1;