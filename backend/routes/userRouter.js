const express=require('express');
const usersController = require('../controllers/usersCtrl');
const isAuthenticated = require('../middlewares/isAuthenticated');
const userRouter= express.Router();
//!register
userRouter.post("/api/v1/user/register",usersController.register)
//!login
userRouter.post("/api/v1/user/login",usersController.login)
//!profile
userRouter.get("/api/v1/user/profile",isAuthenticated,usersController.profile)
//!change password
userRouter.put("/api/v1/user/changePassword",isAuthenticated,usersController.changeUserPassword)
//!update user
userRouter.put("/api/v1/user/updateProfile",isAuthenticated,usersController.updateProfile)
module.exports=userRouter;