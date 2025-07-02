const express=require('express');
const { default: mongoose } = require('mongoose');
const admin_router = require('./Router/adminrouter');
const app=express();
const cors=require('cors');
const user_router = require('./Router/userrouter');
const cookieParser=require('cookie-parser');

const allowedOrigins = ['http://localhost:5173','http://localhost:5174'];
const cors_options={
    origin:function(origin,cb){
        if(allowedOrigins.includes(origin) || !origin){
            cb(null,true)
        }
        else {
            cb(new Error("Not allowed by CORS"));
        }
    },
    credentials:true,
    method:["GET","POST"]
}

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));
app.use(cookieParser());
app.use(cors(cors_options));
app.use('/admin',(req,res,next)=>{
    next();
},admin_router);
app.use("/user",(req,res,next)=>{
    
    next();
    
},user_router);


mongoose.connect("mongodb://localhost:27017/hopitality").then(()=> console.log("success")).catch((e)=>console.log(e.message));
app.listen(5000,function(){
    console.log("Server Started At : ",5000);
})
