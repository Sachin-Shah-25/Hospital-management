const create_auth_model = require("../Model/authmode");
const jwt = require('jsonwebtoken');
const SECRET_KEY = require("../seckret_key/seckret");
const bookappointment = require("../Model/appmodel");

const create_user_acc = async (req, res) => {
    try {
        const { userfirstname, userlastname, useremail, userphone, usernic, userdob,
            userpassword, gender } = req.body;



        const isUserAlreadyRegistred = await create_auth_model.findOne({useremail: useremail.trim()});
        if (!isUserAlreadyRegistred) {
            return res.status(503).json({ success: false, message: "Email is already registred" })
        }
        const is_acc_created = await create_auth_model.create({
            username: userfirstname.trim() + " " + userlastname.trim(),
            useremail: useremail.trim(),
            userpassword: userpassword.trim(),
            userphone: userphone.trim(),
            usernic: usernic.trim(),
            userdob: userdob.trim(),
            gender: gender.trim()
        });
        if (!is_acc_created) {
            return res.status(503).json({ success: false, message: "Some went wrong" });
        }
        res.cookie('token', generate_token(is_acc_created._id), {
            httpOnly: true,
            maxAge: Date.now() + (24 * 3 * 60 * 60 * 1000)
        });
        return res.status(200).json({ success: true, message: is_acc_created });
    } catch (error) {
        return res.status(503).json({ success: true, message: error.message })
    }

}
const user_login = async (req, res) => {
    const { useremail, userpassword } = req.body;
    try {
        const isUserFind = await create_auth_model.findOne({ useremail });
        if (!isUserFind) {
            return res.status(403).json({ success: false, message: "user not Found " });
        }
        if (userpassword.trim() != isUserFind.userpassword) {
            return res.status(503).json({ success: false, message: "Password Doesn't Match" });
        }

        res.cookie('token', generate_token(isUserFind._id), {
            httpOnly: true,
            maxAge: Date.now() + (24 * 3 * 60 * 60 * 1000)
        });

        return res.status(200).json({ success: true, message: "Login Successfully" });
    } catch (error) {
        return res.status(503).json({ success: false, message: error.message });
    }
}
function generate_token(username, user_id) {
    const payload = { userName: username, id: user_id }
    // const secret_key = user_id.substring(0, (user_id.length / 2) ) + username + user_id.substring(user_id.length / 2, user_id.length - 1);
    const token = jwt.sign(payload, SECRET_KEY);

    return token;
}
const user_app_fun = async (req, res) => {
    const { firstname, lastname, email, phone, nic, dob, gender, appdate, dep, doctorname, address, isvisited } = req.body;

    try {
        const is_app_successfull = await bookappointment.create({ firstname, lastname, email, phone, nic, dob, gender, appdate, dep, doctorname, address, isvisited });

        if (!is_app_successfull) {
            return res.status(503).json({ success: false, message: "Something went wrong" });
        }

        return res.status(200).json({ success: true, message: is_app_successfull });
    } catch (error) {
        return res.status(503).json({ success: false, message: error.message });
    }
}
module.exports = { create_user_acc, user_login, user_app_fun }