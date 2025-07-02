const mongoose = require("mongoose");


const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    nic: {
        type: String,
        require: true
    },
    dob: {
        type: String,
        require: true
    },
    dep:{
        type:String,
        require:true
    },
    image: {
        type: String,
        require: true
    }
}, { timestamps: true });


const create_doc_data = mongoose.model("doctor", doctorSchema);
module.exports = create_doc_data;