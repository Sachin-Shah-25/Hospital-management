const express = require('express');
const dotenv = require('dotenv')
dotenv.config()
const { default: mongoose } = require('mongoose');
const admin_router = require('./Router/adminrouter');
const app = express();
const cors = require('cors');
const user_router = require('./Router/userrouter');

const booking=require('./model/bookingmodel')
const cookieParser = require('cookie-parser');
const upload = require('./helpers/helper');
const { getUserFun, chnagePasswordFun } = require('./Controller/authcontoller');
const { verifyUser } = require('./utils/token');
const create_auth_model = require("./Model/authmode")
const Groq = require("groq-sdk")


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));


const options = {
    origin: ["http://localhost:5173", "http://localhost:5174", ["*"]],
    credentials: true
}
app.use(cors(options));

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})
let userState = {
    step: "askName",
    data: {}
}

app.use('/admin', upload.none(), (req, res, next) => {
    console.log(req.body, " hi ")
    next()
}, admin_router);

app.get('/myadminid', (req, res, next) => {
    console.log("rn ")
    next()
}, async (req, res, next) => {
    try {
        console.log("cookies ", req.cookies.cookies)
        if (req.cookies.cookies) {
            const data = await create_auth_model.findOne({});
            return res.status(200).json(data);
        }
        throw new Error("Login Again")
    } catch (e) {
        next(e)
    }
});

app.get('/me', (req, res, next) => {
    console.log("rn ")
    userState = {
        step: "askName",
        data: {}
    }
    next()
}, async (req, res, next) => {
    try {
        console.log("cookies ", req.cookies['token_key'])
        if (req.cookies['token_key']) {
            // const data = await create_auth_model.findOne({});
            return res.status(200).json({ success: true, message: "User loged" });
        }

    } catch (e) {
        next(e)
    }
});


app.post("/chat", async (req, res, next) => {
    console.log("chat box")
    try {
        const { message } = req.body;
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "system", content: `
                    You are a medical assistant.
                    Your job is
                    1. Summarize user symptoms in short
                    bullet points
                    2. Suggest the correct hospital
                    3. keep response simple and structured
                    4. Department should be one of them Radiology, ENT, Gynecology, Psychiatry, Urology, Pediatrics, Dermatolgoy, Orthopedics, Neurology
                    Format:
                    Symptoms: ...
                    Department: ...
                    `},
                { role: "user", content: message }
            ],
            model: "llama-3.1-8b-instant"
          
        })
        console.log(response.choices[0].message)
        return res.status(200).json({ success: true, message: "Done",reply:response.choices[0].message })
    }
    catch (e) {
        next(e)
    }
})


app.post("/sum", async (req, res, next) => {
    const { message } = req.body
    try {
        const response = await groq.chat.completions.create({
            messages: [
                {
                    role: "system", content: `You are a doctor User ke symptoms ko English mein natural tareeke se likho.

1. Sabse pehle ek line likho: "Sir meri tabyiet kharab hai"
2. Uske baad har symptom ko next line mein bullet points mein likho
3. IMPORTANT: Har bullet point ke baad ek blank line zaroor ho
4. Har bullet ek simple aur clear sentence ho
5. Language bilkul natural ho (jaise real patient bolta hai)

Example format:

Sir meri tabyiet kharab hai

- Mujhe 2 din se bukhar hai

- Bhook nahi lag rahi

- Baar baar vomiting ho rahi hai
                  
                    `},
                { role: "user", content: message }
            ],
            model: "llama-3.1-8b-instant"
        });
        console.log(response)
        console.log(response.choices[0].message)
        return res.status(200).json({ success: true, res: response.choices[0].message })
    } catch (e) {
        next(e)
    }
})

app.post("/usercred", async (req, res, next) => {
    try {
        const { det } = req.body;
        if (userState.step === "askName") {
            userState.data.name = det
            userState.step = "askAge"
            return res.status(200).json({ success: true, rep: det, next: "What is your age ?" })
        } else if (userState.step === "askAge") {
            userState.data.age = det
            userState.step = "askGender"
            return res.status(200).json({ success: true, rep: det, next: "Gender" })
        }
        else if (userState.step === "askGender") {
            userState.data.gender = det
            userState.step = "askemail"
            return res.status(200).json({ success: true, rep: det, next: "Please Enter Your Email" })
        }
        else if (userState.step === "askemail") {
            userState.data.email = det
            userState.step = "asknumber"

            return res.status(200).json({ success: true, rep: det, next: "Please Enter your Number" })
        }
        else if (userState.step === "asknumber") {
            userState.data.number = +(det)
            userState.step = "dep"
            return res.status(200).json({ success: true, rep: det, next: "Which Department want to you consult ?" })
        }
        else if (userState.step === "dep") {
            userState.data.dep = det
            console.log("bookin SucessFull")
            console.log(userState)
            const re = res.status(200).json({ confirmBooking: true, success: true, rep: det, message: "Appointment Booked", details: userState })
            console.log(re)
            return re;
        }
        else {
            console.log(det)
            return res.status(200).json({ success: false, message: "We coudn't process further" })
        }


    }
    catch (e) {
        next(e)
    }
})


app.get("/confrim",async(req,res,next)=>{
try{
    
    const data=await booking.create({...userState.data})
    if(!data){
        throw new Error()
    }
    return res.json(200).status({success:true,message:"Booked",data})
}
catch(e){
    next(e)
}
})

app.use("/user", upload.none(), (req, res, next) => {
    // console.log("data ", req.body)
    next()
}, user_router);

app.use((err, req, res, next) => {
    console.log("error ", err)
    return res.status(err.status || 500).json({ message: err.message || "Something went wrong" })
})




app.get("/userid", (req, res, next) => {
    userState = {
        step: "askName",
        data: {}
    }
    next()
}, verifyUser, getUserFun)
app.get("/logout", (req, res) => {
    userState = {
        step: "askName",
        data: {}
    }
    res.clearCookie("token_key", {
        httpOnly: true,
        secure: false
    });
    return res.status(200).json({ message: "Logged out successfully" });
})
app.post("/changep", upload.none(), chnagePasswordFun)

mongoose.connect("mongodb+srv://sachin:sachin@cluster0.pw34icm.mongodb.net/?appName=Cluster0").then(() => console.log("success")).catch((e) => console.log(e.message));
app.listen(5000, function () {
    console.log("Server Started At : ", 5000);
})
