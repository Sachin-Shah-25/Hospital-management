const express=require('express');
const { create_user_acc,user_login ,user_app_fun} = require('../Controller/authcontoller');
const { verifyUser } = require('../utils/token');
const user_router=express.Router();


user_router.post("/signup",create_user_acc);
user_router.post("/login",user_login);
user_router.post("/bookappointment",verifyUser,(req,res,next)=>{
next();
},user_app_fun);

module.exports=user_router;