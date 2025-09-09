const express = require("express");
const { add_doc_fun, get_all_doctors, admin_login, get_doctors_name, get_all_appointment } = require("../Controller/admincontroller");
const upload = require("../helpers/helper");
const admin_router = express.Router();


admin_router.get("/login",admin_login);
admin_router.post("/adddoctor", upload.single('image'),add_doc_fun);
admin_router.get("/doctors", get_all_doctors);
admin_router.get("/doctors/:id", get_doctors_name);
admin_router.get("/appointments", get_all_appointment);


module.exports = admin_router;