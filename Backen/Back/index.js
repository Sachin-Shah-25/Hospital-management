const express=require('express');
const dotenv=require('dotenv')
dotenv.config()
const { default: mongoose } = require('mongoose');
const admin_router = require('./Router/adminrouter');
const app=express();
const cors=require('cors');
const user_router = require('./Router/userrouter');
const cookieParser=require('cookie-parser');
const upload = require('./helpers/helper');
const {getUserFun, chnagePasswordFun } = require('./Controller/authcontoller');
const { verifyUser } = require('./utils/token');


const options={
    origin:["http://localhost:5173","http://localhost:5174",["*"]],
    credentials:true
}

app.use(cors(options));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));

app.use('/admin',admin_router);





app.use("/user",upload.none(),(req,res,next)=>{
    console.log("data ", req.body)
    next()
},user_router);

app.use((err,req,res,next)=>{
    console.log("error ",err)
    return res.status(err.status||500).json({message:err.message || "Something went wrong"})
})




app.get("/userid",verifyUser,getUserFun)
app.get("/logout",(req,res)=>{
    console.log("clear")
    res.clearCookie("token_key", {
        httpOnly: true,
        secure: false
    });
    return res.status(200).json({ message: "Logged out successfully" });
})
app.post("/changep",upload.none(),chnagePasswordFun)

mongoose.connect("mongodb://localhost:27017/hopitality").then(()=> console.log("success")).catch((e)=>console.log(e.message));
app.listen(5000,function(){
    console.log("Server Started At : ",5000);
})
