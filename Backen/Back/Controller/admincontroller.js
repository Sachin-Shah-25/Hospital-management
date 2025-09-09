const create_doc_data = require("../Model/adminmodel");
const bookappointment = require("../Model/appmodel");

const admin_login = async (req, res, next) => {
    const { username, useremail, userpassword } = req.body;
    try {
        const login_admin = await createauthmodel.create({
            username,
            useremail,
            userpassword
        });
        if (!login_admin) {
            throw new Error("Please Login Again")
        }
        return res.status(201).json({ success: true, message: "Account Created successfully" });
    } catch (error) {
        next(error)
    }
}

const add_doc_fun = async (req, res, next) => {
    const { firstname, lastname, email, phone, nic, dob, dep } = req.body
    console.log(req.body)
    try {
        if (!req.file) {
            throw new Error("Image Not Found")
        }
        const getImageName = req.file.filename;
        const isdoctorUploaded = await create_doc_data.create({
            name: firstname + " " + lastname,
            email, phone, nic, dob,
            image: getImageName,
            dep
        });
        if (!isdoctorUploaded) {
            throw new Error("Something Went Wrong")
        }
        return res.status(200).json({ success: true, message: isdoctorUploaded });
    } catch (error) {
        next(error)
    }

}

const get_all_doctors = async (req, res, next) => {
    try {

        const getAllDoc = await create_doc_data.find({});
        if (!getAllDoc) {
            throw new Error("The Data Available")
        }
        console.log(getAllDoc)
        return res.status(200).json({ success: true, data: getAllDoc });
    } catch (error) {
        next(error)
    }
}

const get_doctors_name = async (req, res,next) => {
    const getDep = req.params.id;
    console.log(getDep)
    try {
        const getAllDoctorsName = await create_doc_data.find({ dep: getDep });
        if (!getAllDoctorsName) throw new Error("Detial Not Found")


        return res.status(200).json({ success: true, message: getAllDoctorsName });
    } catch (error) {
        next(error)
    }
}

const get_all_appointment = async (req, res,next) => {
    try {
        const getResponse = await bookappointment.find({});
        if (!getResponse) {
            throw new Error("Something Went Wrong")
        }
        return res.status(200).json({ success: true, message: getResponse });
    } catch (error) {
      next(error)
    }
}

module.exports = { add_doc_fun, get_all_doctors, admin_login, get_doctors_name, get_all_appointment };