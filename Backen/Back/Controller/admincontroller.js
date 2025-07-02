const create_doc_data = require("../Model/adminmodel");
const bookappointment = require("../Model/appmodel");

const admin_login = async (req, res) => {
    const { username, useremail, userpassword } = req.body;

   
    try {

        const login_admin = await createauthmodel.create({
            username,
            useremail,
            userpassword
        });
        if (!login_admin) {
            return res.status(503).json({ success: false, message: "Something went wrong" });
        }
        return res.status(200).json({ success: true, message: "Account Created successfully" });
    } catch (error) {
        return res.status(503).json({ success: false, message:error.message});
    }
}

const add_doc_fun = async (req, res) => {
    const { firstname, lastname, email, phone, nic, dob,dep } = req.body
    const getImageName=req.file.filename;
    try {
        const isdoctorUploaded = await create_doc_data.create({
            name: firstname + " " + lastname,
            email, phone, nic, dob,
            image:getImageName,  
            dep
        });
        if (!isdoctorUploaded) {
            return res.status(503).json({ success: false, message: "No Uploaded" });
        }
        return res.status(200).json({ success: true, message: isdoctorUploaded });
    } catch (error) {
        return res.status(505).json({ success: false, message: error.message });
    }

}

const get_all_doctors=async(req,res)=>{
    const getAllDoc=await create_doc_data.find({});
    if(!getAllDoc){
        return res.status(404).json({success:false,message:"Doctor Detail Not Found"});
    }
    return res.status(200).json({success:true,message:getAllDoc});
}

const get_doctors_name=async(req,res)=>{
    const getDep=req.params.id;
    try {
        const getAllDoctorsName=await create_doc_data.find({dep:getDep});
        if(!getAllDoctorsName) return res.status(503).json({success:false,message:"Not Available"});


        return res.status(200).json({success:true,message:getAllDoctorsName});
    } catch (error) {
        return res.status(503).json({success:false,message:error.message});
    }
}

const get_all_appointment=async(req,res)=>{
    try {
        const getResponse=await bookappointment.find({});
        if(!getResponse){
            return res.status(503).json({success:false,message:"Not Record Found "});
        }
        return res.status(200).json({success:true,message:getResponse});
    } catch (error) {
        return res.status(503).json({success:false,message:error.message});F
    }
}

module.exports = {add_doc_fun,get_all_doctors,admin_login,get_doctors_name,get_all_appointment};