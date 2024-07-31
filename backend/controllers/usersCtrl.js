const asyncHandler=require('express-async-handler')
const User=require("../model/User")
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const usersController={
    //*register
    register: asyncHandler(async(req,res)=>{
        const{username,email,password}=req.body;
        if(!username||!email||!password){
            throw new Error("all fields required");;
        }
        //! user exists
        const userExists= await User.findOne({email})
        if(userExists){
            throw new Error("User already exists");;
        }
        //! hash userpassword
        const salt=await bcrypt.genSalt(10);
        const hashedpass= await bcrypt.hash(password,salt)
        //! create user
        const userCreated= await User.create({
            username,email,password:hashedpass
        })
        //! response
        res.json({
            username: userCreated.username,
            email: userCreated.email,
            password: userCreated.password,
            id: userCreated._id,

        })
    }),
    //*login
    login: asyncHandler(async(req,res)=>{
        const {email,password}=req.body;
        const user=await User.findOne({email})
        if(!user)
        {
            throw new Error("Invalid Login Credential");
        }
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            throw new Error("Invalid Password");
        }
        //! generate token
        const token = jwt.sign({id: user._id},"pradeesh",{
            expiresIn:'30d'
        })
        res.json({
            message:"Login Success",
            token,
            id: user._id,
            email: user.email,
            username: user.username
        })
    }),
    //*profile
    profile: asyncHandler(async(req,res)=>{
        const user=await User.findById(req.user)
        if(!user){
            throw new Error("User not found")
        }
        res.json({
            username: user.username,
            email: user.email
        })
    }),
    //* change password
    changeUserPassword: asyncHandler(async(req,res)=>{
        const {newPassword}=req.body
        const user=await User.findById(req.user);
        if(!user)
        {
            throw new Error("User Not Found")
        }
        const salt= await bcrypt.genSalt(10);
        const hashedPass= await bcrypt.hash(newPassword,salt);
        user.password=hashedPass;
        await user.save();
        res.json({message: "password changed successfully"})
    }),
    //*update profile
    updateProfile: asyncHandler(async(req,res)=>{
        const {username,email}=req.body;
        const user=await User.findByIdAndUpdate(req.user,{
            username,email
        },{
            new: true,
        })
        res.json({message:"User Updated successfully"})
    })
}
module.exports=usersController;