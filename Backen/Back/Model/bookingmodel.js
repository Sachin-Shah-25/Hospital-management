const mongoose=require('mongoose')

const bookingscheam=new mongoose.Schema({
    bookinby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    name:{
        type:String
    },
    age:{
        type:Number
    },
    email:{
        type:String
    },
    gender:{
        type:String
    },
    dep:{
        type:String
    },
    number:{
        type:String
    },
})
const booking=mongoose.model("booking",bookingscheam)

module.exports = booking