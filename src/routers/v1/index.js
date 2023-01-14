const express = require('express');
const authorization = require('../../middlewares/auth');
const reqRole = require("../../middlewares/requireRole");
const upload = require('../../middlewares/upload');
const userController = require('../../controllers/user.controller');
const authController = require('../../controllers/auth.controller');
const homeController = require('../../controllers/home.controller');
const detailsController = require('../../controllers/details.controller');
const uploadController = require('../../controllers/upload.controller');
const v1 = express.Router();
// Đăng nhập, đăng ký
v1.post('/login',authController.login());
v1.post("/register",authController.register());
// HomePage
v1.get('/home',homeController.getAllImage()); 
v1.get('/home/:name',homeController.getImageByName());
// DetailsPage
v1.get('/detail/:imgId',detailsController.getDetailbyId())
v1.get('/comment/:imgId',detailsController.getCommentbyImgId())
v1.get('/checksaveimg/:imgId',authorization,detailsController.checkSavedImg())
// v1.post('/cmt',authorization,detailsController.saveCmt())//post luu thong tin binh luan cua ng dung vs hinh anh


module.exports = v1;