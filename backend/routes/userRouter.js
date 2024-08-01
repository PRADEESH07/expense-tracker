const express=require('express');
const usersController = require('../controllers/usersCtrl');
const isAuthenticated = require('../middlewares/isAuthenticated');
const userRouter= express.Router();
//!register
userRouter.post("/user/register",usersController.register)
//!login
userRouter.post("/user/login",usersController.login)
//!profile
userRouter.get("/user/profile",isAuthenticated,usersController.profile)
//!change password
userRouter.put("/user/changePassword",isAuthenticated,usersController.changeUserPassword)
//!update user
userRouter.put("/user/updateProfile",isAuthenticated,usersController.updateProfile)
module.exports=userRouter;
