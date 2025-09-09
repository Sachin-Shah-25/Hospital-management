import React, { useState, useRef, useContext } from 'react'
import '../App.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { isCookie, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Contex } from '../Cont/Contex';
import Forget from '../components/Forget';

function Register() {
  const getContext = useContext(Contex);
  const getNavigate = useNavigate();
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [getuserfirstname, setuserfirstname] = useState("");
  const [getuserlastname, setuserlastname] = useState("");
  const [getuseremail, setusereamil] = useState("");
  const [getuserphone, setuserphone] = useState("");
  const [getusernic, setusernic] = useState("");
  const [getuserdob, setuserdob] = useState("");
  const [getusergender, setusergender] = useState("");
  const [getuserpassword, setuserpassword] = useState("");
  const [showForgetBox,setForgetBox]=useState(false)
  const getFormRef=useRef()

  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regex.test(email);
  }
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      if (IsLoggedIn) {

        if (!getuserfirstname || !getuserlastname || !getuseremail || !getuserphone ||
          !getusernic || !getuserdob || !getusergender || !getuserpassword) {
          toast.error("Please fill all the details");
          return;
        }
        if (!validateEmail(getuseremail)) {
          toast.error("Email Not Valid");
          return;
        }
        const form_Data = new FormData(e.target);
        const { data } = await axios.post("http://localhost:5000/user/signup", form_Data, { withCredentials: true ,headers:{
          "Content-Type":"multipart/form-data"
        }});
        if (data.success || data.status == 200) {
          toast.success("Login");
          setIsLoggedIn(true)
          setuserfirstname("");
          setuserlastname("");
          setusereamil("");
          setuserphone("");
          setuserdob("");
          setusernic("");
          setuserpassword("");
          // getContext.setUserAccount(data.message);
        }
        getContext.set_IfUserLogin(true);
      }
      else {
        if (!getuseremail || !getuserpassword) {
          toast.error("All Field are required ");
          return;
        }
        if (!validateEmail(getuseremail)) {
          toast.error("Email Not Valid");
          return;
        }

        const form_data = new FormData(e.target);
        // const { data } = await axios.post("http://localhost:5000/user/login", form_data, {withCredentials: true});

        const data=await
         axios.post("http://localhost:5000/user/login",
          form_data,{
            withCredentials:true,
            
          
          })

        getContext.set_IfUserLogin(data.data.data)

        if (data.success || data.status==200) {
          toast.success("Login Successfully");
          getContext.setUserAccount(data.message);

        }
        getContext.set_IfUserLogin(true);
        getNavigate('/')

      }
    }
    catch (error) {
      const status=error.response.status
            const msg=error.response.data.message
            if(status==404){
              toast.error(msg)
            }
            else if(status==409){
              toast.error(msg)
            }
             else if(status==400){
              toast.error(msg)
            }
            else {
              toast.error("Something went wrong");
              console.log("An error Occured : ",error.message)
            }
    }
  }

  const forgetFunction = ()=>{
    setForgetBox(true)
    console.log(getFormRef.current)
  }
  return (
    <div id='user_register' className=''style={{
    }} >
      {
        showForgetBox 
        ? <Forget setForgetBox={setForgetBox} showForgetBox={showForgetBox}  ></Forget>
        :""
      }
     
      <div className="form_box" ref={getFormRef} 
      style={{ 
        textAlign: IsLoggedIn ? "center" : 'left' ,
        display: showForgetBox?"none":"block"
      
        }}>
        <div className="formtype">
          <h1>{IsLoggedIn ? "Sign Up " : "Sign In"}</h1>
        </div>


        {
          IsLoggedIn
            ? <form   onSubmit={(e) => submitForm(e)}   >
              <div className="userfirstname">
                <input type="text" name='userfirstname' value={getuserfirstname} onChange={(e) => { setuserfirstname(e.target.value) }} placeholder='First Name' />
              </div>
              <div className="userfullname">
                <input type="text" name='userlastname' value={getuserlastname} onChange={(e) => { setuserlastname(e.target.value) }} placeholder='LastName' />
              </div>
              <div className="useremail">
                <input type="text" name='useremail' value={getuseremail} onChange={(e) => { setusereamil(e.target.value) }} placeholder='Email' />
              </div>
              <div className="userphone">
                <input type="text" name='userphone' value={getuserphone} onChange={(e) => { setuserphone(e.target.value) }} placeholder='Phone Number' />
              </div>
              <div className="nic">
                <input type="text" name='usernic' value={getusernic} onChange={(e) => { setusernic(e.target.value) }} placeholder='NIC' />
              </div>
              <div className="dob" id='dob_data'>
                <input type="text" id='dob_input' value={getuserdob} onChange={(e) => { setuserdob(e.target.value) }} name='userdob' placeholder='Your Date Of Birth' />
              </div>
              <div className="gender">
                <select value={getusergender} name='gender' onChange={(e) => { setusergender(e.target.value) }}>
                  <option value="select">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="username" value={getuserpassword} onChange={(e) => { setuserpassword(e.target.value) }} id='appoint_data'>
                <input type="text" name="userpassword" id='appoint_input' placeholder='Password' />
              </div>

              <div id='already_acc' style={{ cursor: 'pointer', width: '100%', display: 'flex', justifyContent: 'left' }}>
                <a onClick={(e) => { setIsLoggedIn(!e) }} style={{ textDecoration: 'underline', fontSize: '13px', color: 'black' }}>You have registred ? Login</a>
              </div>

              <div id="user_signup">
                <button>Register</button>
              </div>
            </form>
            :
            <form onSubmit={(e) => { submitForm(e) }} action="#" style={{ display: 'flex', flexDirection: 'column' }}>

              <div className="useremail">
                <input type="text" name='useremail' value={getuseremail} onChange={(e) => setusereamil(e.target.value)} placeholder='Email' />
              </div>
              <div>
                <input type="text" name='userpassword' value={getuserpassword} placeholder='Password' onChange={(e) => setuserpassword(e.target.value)} />
                <span onClick={()=> forgetFunction()}  style={{
                  color:"#559af3",
                  float:"right",
                  fontSize:".8rem",
                  marginTop:"5px",
                  cursor:"pointer"
                }}>Forget Password ?</span>
              </div>

              <div className="new_acc" style={{ color: 'black' }}> <span style={{ fontSize: '13px' }}>New User ?</span>
                <a id='switch_signup' onClick={() => { setIsLoggedIn(!IsLoggedIn) }} style={{ cursor: 'pointer', fontSize: '13px', color: 'black', marginLeft: '5px' }}>Signup </a>
              </div>
              <div id="user_Login">
                <button>Login</button>
              </div>
            </form>

        }
        <p style={{ fontSize: "12px", color: "#0e75f9" }}>* Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero maxime itaque asperiores facilis hic beatae in eaque fugiat cumque architecto.</p>
      </div>
    </div>
  )
}

export default Register
