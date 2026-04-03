const create_auth_model = require("../Model/authmode");
const jwt = require('jsonwebtoken');
const SECRET_KEY = require("../seckret_key/seckret");
const bookappointment = require("../Model/appmodel");
const { generteKey } = require("../utils/token");
const create_doc_data = require("../Model/adminmodel");

const create_user_acc = async (req, res, next) => {
    try {
        const { username, useremail, userpassword } = req.body;
        if (req.cookies["token"]) {
            res.cookie("token", usertoken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
                maxAge: 0
            })
        }
        const isUserAlreadyRegistred = await create_auth_model.findOne({ useremail: useremail.trim() });

        if (isUserAlreadyRegistred) {
            return res.status(409).json({ success: false, message: "Email is already registred" })
        }
        await create_auth_model.create({
            username: username.trim(),
            useremail: useremail.trim(),
            userpassword: userpassword.trim(),
        });

        return res.status(201).json({ success: true, message: "Login Again" })
    } catch (error) {
        next(error)
    }

}
const user_login = async (req, res, next) => {
    const { useremail, userpassword } = req.body;
    try {
        const isUserFind = await create_auth_model.findOne({ useremail });
        if (!isUserFind) {
            return res.status(404).json({ success: false, message: "Email not registred" })
        }
        if (userpassword.trim() != isUserFind.userpassword) {
            return res.status(400).json({ success: false, message: "Password Doesn't match" })
        }

        const getToken = generteKey(isUserFind.username, isUserFind.useremail, isUserFind._id)
        res.cookie("token", usertoken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 3 * 60 * 60 * 1000
        })
        return res.status(200).json({ success: true, message: "Login Successfully", data: isUserFind });
    } catch (error) {
        next(error)
    }
}

const getUserFun = async (req, res, next) => {
    try {
        const getUser = req.user
        const findUser = await create_auth_model.findOne({ useremail: getUser.useremail })
        return res.status(200).json({ success: true, message: "User", data: findUser })
    } catch (error) {
        next(error)
    }
}

const chnagePasswordFun = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const checkEmail = await create_auth_model.findOne({ useremail: email.trim() })
        if (!checkEmail) {
            return res.status(404).json({ success: false, message: "Email not exists" })
        }
        const isUpdated = await create_auth_model.findOneAndUpdate({ useremail: email }, { $set: { userpassword: password } })

        if (!isUpdated) {
            throw new Error("Something Went wrong")
        }
        return res.status(200).json({ success: true, message: "password has been chagned" })
    } catch (error) {
        next(error)
    }
}


const user_app_fun = async (req, res, next) => {
    const { firstname, lastname, email, phone, nic, gender, appdate, dep, doctor, isvisited, time } = req.body;
    try {
        const isAppExists = await bookappointment.findOne({ email });

        if (isAppExists) {
            return res.status(409).json({
                success: false,
                message: "Appointment already booked with this email"
            });
        }
        const reserveApp = await create_doc_data.findOne({ dep })
        let getSlots = reserveApp.available.time
        const updated = getSlots.map((slots) => {
            return { ...slots, book: time === slots.slot ? true : false }
        });
        reserveApp.available.time = updated
        reserveApp.markModified('available.time')
        await reserveApp.save()
        const is_app_successfull = await bookappointment.create({
            firstname, lastname, email, phone, nic, gender, appdate, dep,
            doctorname: doctor
            , isvisited, time, bookinby: req.user.userId
        });

        if (!is_app_successfull) {
            throw new Error("Something Went Wrong")
        }

        return res.status(200).json({ success: true, message: is_app_successfull });
    } catch (error) {
        next(error)
    }
}


const getUserAppointments = async (req, res, next) => {
    try {
        const data = await bookappointment.find({ bookinby: req.user.userId }).populate({
            path: "bookinby",
            select: "username useremail"
        });
        return res.status(200).json({ success: true, det: { name: req.user.username, email: req.user.useremail }, booked: data || [] })
    } catch (e) {
        next(e)
    }
}
const cancelApp = async (req, res, next) => {
    try {

        const data = await bookappointment.findOne({ _id: req.params.id })
        const reserveApp = await create_doc_data.findOne({ dep: data.dep })
        let getSlots = reserveApp.available.time
        const updated = getSlots.map((slots) => {
            return { ...slots, book: data.time === slots.slot ? false : slots.book }
        });
        reserveApp.available.time = updated
        reserveApp.markModified('available.time')
        await reserveApp.save();
        await data.deleteOne()

        return res.status(200).json({ success: true, message: "Delete Successfull" })
    } catch (e) {
        next(e)
    }
}
module.exports = { create_user_acc, user_login, user_app_fun, getUserFun, chnagePasswordFun, getUserAppointments, cancelApp }