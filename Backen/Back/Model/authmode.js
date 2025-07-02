const mongoose=require('mongoose');


const authschema=new mongoose.Schema({
    username:{
        type:String
    },
    useremail:{
        type:String
    },
    userpassword:{
        type:String
    },
    userphone:{
        type:String
    },
    usernic:{
        type:String
    },
    userdob:{
        type:String
    },
    userpassword:{
        type:String
    },
    gender:{
        type:String
    }
},{timestamps:true});


const create_auth_model=mongoose.model("user",authschema);

module.exports=create_auth_model