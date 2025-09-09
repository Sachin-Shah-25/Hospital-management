const create_auth_model = require("../Model/authmode");
const jwt = require('jsonwebtoken');
const SECRET_KEY = require("../seckret_key/seckret");
const bookappointment = require("../Model/appmodel");
const {generteKey} = require("../utils/token");

const create_user_acc = async (req, res,next) => {
    console.log("run")
    try {
        const { userfirstname, userlastname, useremail, userphone, usernic, userdob,
            userpassword, gender } = req.body;


        const isUserAlreadyRegistred = await create_auth_model.findOne({useremail: useremail.trim()});
        console.log(isUserAlreadyRegistred)

        if (isUserAlreadyRegistred) {
            console.log("Alrady exists ")
            return res.status(409).json({ success: false, message: "Email is already registred" })
        }
         await create_auth_model.create({
            username: userfirstname.trim() + " " + userlastname.trim(),
            useremail: useremail.trim(),
            userpassword: userpassword.trim(),
            userphone: userphone.trim(),
            usernic: usernic.trim(),
            userdob: userdob.trim(),
            gender: gender.trim()
        });
        console.log("Done Bro")
     
        return res.status(201).json({success:true,message:"Login Again"})
    } catch (error) {
       next(error)
    }

}
const user_login = async (req, res,next) => {
    const { useremail, userpassword } = req.body;
    try {
        const isUserFind = await create_auth_model.findOne({ useremail });
        if (!isUserFind) {
            return res.status(404).json({ success: false, message: "Email not registred" })
        }
        if (userpassword.trim() != isUserFind.userpassword) {
             return res.status(400).json({ success: false, message: "Password Doesn't match" })
        }
                const getToken=generteKey(isUserFind._id,isUserFind.useremail)
                console.log(getToken)
        res.cookie('token_key', getToken, {
            httpOnly: true,
            secure:false,
            maxAge:(24 * 3 * 60 * 60 * 1000)
        });

        return res.status(200).json({ success: true, message: "Login Successfully",data:isUserFind });
    } catch (error) {
        next(error)
    }
}

const getUserFun=async(req,res,next)=>{
    try {
        const getUser=req.user
        const findUser=await create_auth_model.findOne({useremail:getUser.useremail})
        console.log(findUser)
        return res.status(200).json({success:true,message:"User",data:findUser})
    } catch (error) {
        next(error)
    }
}

const chnagePasswordFun=async(req,res,next)=>{
    const { email,password } = req.body;
    try {
         console.log(req.body)
         const checkEmail= await create_auth_model.findOne({useremail:email.trim()})
         console.log("match ", checkEmail)
        if(!checkEmail ){
            console.log("eror")
            return res.status(404).json({success:false,message:"Email not exists"})
        }
        const isUpdated=await create_auth_model.findOneAndUpdate({useremail:email},{$set:{userpassword:password}})
        
        console.log(isUpdated)
        if(!isUpdated){
            throw new Error("Something Went wrong")
        }
        return res.status(200).json({success:true,message:"password has been chagned"})
    } catch (error) {
        next(error)
    }
}

const user_app_fun = async (req, res,next) => {
    const { firstname, lastname, email, phone, nic, dob, gender, appdate, dep, doctorname, address, isvisited } = req.body;

    try {
         console.log("done")
        const is_app_successfull = await bookappointment.create({ firstname, lastname, email, phone, nic, dob, gender, appdate, dep, doctorname, address, isvisited });
        console.log(is_app_successfull)
        if (!is_app_successfull) {
           throw new Error("Something Went Wrong")
        }

        return res.status(200).json({ success: true, message: is_app_successfull });
    } catch (error) {
      next(error)
    }
}
module.exports = { create_user_acc, user_login, user_app_fun ,getUserFun,chnagePasswordFun}