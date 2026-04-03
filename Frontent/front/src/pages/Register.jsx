import React, { useState, useRef, useContext } from 'react'
import '../App.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { isCookie, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Contex } from '../Cont/Contex';
import Forget from '../components/Forget';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
const VITE_BASE_URL= import.meta.env.VITE_BASE_URL

function Register() {
  const getContext = useContext(Contex);
  const getNavigate = useNavigate();
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [showPass, hidePass] = useState(false)
  const [getUserAuth, setUserAuth] = useState({
    username: "",
    useremail: "",
    userpassword: ""
  })
  // const [getuserfirstname, setuserfirstname] = useState("");
  // const [getuserlastname, setuserlastname] = useState("");
  // const [getuseremail, setusereamil] = useState("");
  // const [getuserpassword, setuserpassword] = useState("");
  const [showForgetBox, setForgetBox] = useState(false)
  const getFormRef = useRef()

  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regex.test(email);
  }
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      if (IsLoggedIn) {

        if (!getUserAuth.username || !getUserAuth.useremail || !getUserAuth.userpassword) {
          toast.error("Please fill all the details");
          return;
        }
        if (!validateEmail(getUserAuth.useremail)) {
          toast.error("Email Not Valid");
          return;
        }
        // const form_Data = new FormData(e.target);
        const { data } = await axios.post(`${VITE_BASE_URL}/user/signup`, getUserAuth, {
          withCredentials: true
        });
        if (data.success || data.status == 200) {
          toast.success("Login");
          setIsLoggedIn(false)
          setUserAuth({ username: "", userpassword: "", useremail: "" })
        }
        getContext.set_IfUserLogin(true);
      }
      else {
        if (!getUserAuth.useremail || !getUserAuth.userpassword) {
          toast.error("All Field are required ");
          return;
        }
        if (!validateEmail(getUserAuth.useremail)) {
          toast.error("Email Not Valid");
          return;
        }

        const data = await
          axios.post(`${VITE_BASE_URL}/user/login`,
            getUserAuth, {
            withCredentials: true,
          })
        if (data.success || data.status == 200) {
          toast.success("Login Successfully");
          getContext.set_IfUserLogin(false);

          getNavigate('/')
        }

      }
    }
    catch (error) {
      const status = error.response.status
      const msg = error.response.data.message
      if (status == 404) {
        toast.error(msg)
      }
      else if (status == 409) {
        toast.error(msg)
      }
      else if (status == 400) {
        toast.error(msg)
      }
      else {
        toast.error("Something went wrong");
        console.log("An error Occured : ", error.message)
      }
    }
  }

  const forgetFunction = () => {
    setForgetBox(true)
  }

  const getUserDetails = (e) => {
    setUserAuth(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  return (
    <div id='user_register' className='' style={{
    }} >
      {
        showForgetBox
          ? <Forget setForgetBox={setForgetBox} showForgetBox={showForgetBox}  ></Forget>
          : ""
      }

      <div className="form_box" ref={getFormRef}
        style={{
          textAlign: IsLoggedIn ? "center" : 'left',
          display: showForgetBox ? "none" : "block"

        }}>
        <div className="formtype">
          <h1>{IsLoggedIn ? "Sign Up " : "Sign In"}</h1>
        </div>


        {
          IsLoggedIn
            ? <form onSubmit={(e) => submitForm(e)}   >
              <div className="userfirstname">
                <input type="text" name='username' value={getUserAuth.username} onChange={(e) => { getUserDetails(e) }} placeholder='Enter Your Name' />
              </div>

              <div className="useremail">
                <input type="text" name='useremail' value={getUserAuth.useremail} onChange={(e) => { getUserDetails(e) }} placeholder='Email' />
              </div>


              <div className="username" id='appoint_data'>
                <input
                  type={showPass ? "text" : "password"}
                  onChange={(e) => { getUserDetails(e) }}
                  name="userpassword"
                  id='appoint_input'
                  placeholder='Password' value={getUserAuth.userpassword} />
                {
                  showPass
                    ? <FaEye onClick={() => hidePass(false)} />
                    : <FaEyeSlash onClick={() => hidePass(true)} />
                }
              </div>
              <div id='already_acc' style={{ cursor: 'pointer', width: '100%', display: 'flex', justifyContent: 'left' }}>
                <a onClick={(e) => {
                   setIsLoggedIn(!e)
                    hidePass(false)
                    }} style={{ textDecoration: 'underline', fontSize: '13px', color: 'black' }}>You have registred ? Login</a>
              </div>

              <div id="user_signup">
                <button>Register</button>
              </div>
            </form>
            :
            <form onSubmit={(e) => { submitForm(e) }} action="#" style={{ display: 'flex', flexDirection: 'column' }}>

              <div className="useremail">
                <input type="text" name='useremail' value={getUserAuth.useremail} onChange={(e) => getUserDetails(e)} placeholder='Email' />
              </div>
              <div className="username" id='appoint_data'>
                <input
                  type={showPass ? "text" : "password"}
                  onChange={(e) => { getUserDetails(e) }}
                  name="userpassword"
                  id='appoint_input'
                  placeholder='Password' value={getUserAuth.userpassword} />
                {
                  showPass
                    ? <FaEye onClick={() => hidePass(false)} />
                    : <FaEyeSlash onClick={() => hidePass(true)} />
                }
              </div>

              <div className="new_acc" style={{ color: 'black' }}> <span style={{ fontSize: '13px' }}>New User ?</span>
                <a id='switch_signup' onClick={() =>
                   { 
                    setIsLoggedIn(!IsLoggedIn)
                    hidePass(false)

                    }} style={{ cursor: 'pointer', fontSize: '13px', color: 'black', marginLeft: '5px' }}>Signup </a>
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
