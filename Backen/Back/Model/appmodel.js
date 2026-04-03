const mongoose = require("mongoose");

const appointment_schema = new mongoose.Schema({
    bookinby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    nic: {
        type: String
    },
    dob: {
        type: String
    },
    gender: {
        type: String
    },
    appdate: {
        type: String
    },
    dep: {
        type: String
    },
    doctorname: {
        type: String
    },
    address: {
        type: String
    },
    isvisited: {
        type: String,
        default: 'off'
    },
    time: {
        type: String
    }
}, { timestamps: true });

const bookappointment = mongoose.model('appointments', appointment_schema);

module.exports = bookappointment;