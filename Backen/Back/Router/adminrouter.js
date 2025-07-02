const express = require("express");
const { add_doc_fun, get_all_doctors, admin_login, get_doctors_name, get_all_appointment } = require("../Controller/admincontroller");
const admin_router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './public/img');
    },
    filename: function (req, file, cb) {
        const file_name = Date.now() + "-" + file.originalname;
        return cb(null, file_name);
    }
});

const upload = multer({ storage });

admin_router.get("/login", (req, res, next) => {
    next();
}, admin_login);

admin_router.post("/adddoctor", upload.single('image'), (req, res, next) => {
    // const imagefile=req.file;
    // console.log(req.file);
    if (!req.file) {
        return res.status(503).json({ success: false, message: "Image Not Found" });
    }

    next();
}, add_doc_fun);

admin_router.get("/doctors", get_all_doctors);
admin_router.get("/doctors/:id", get_doctors_name);
admin_router.get("/appointments", get_all_appointment);


module.exports = admin_router;