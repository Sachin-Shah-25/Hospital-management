import React, { useState, useRef, useContext } from 'react'
import '../App.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { isCookie, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Contex } from '../Cont/Contex';

function Register() {
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
  const formInput = useRef("");
  const getContext=useContext(Contex);

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
        if(!validateEmail(getuseremail)){
          toast.error("Email Not Valid");
          return;
        }
        const form_Data = new FormData(e.target); 
        const { data } = await axios.post("http://localhost:5000/user/signup", form_Data, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (data.success) {
          toast.success("Account Created Succssfully");
          setuserfirstname("");
          setuserlastname("");
          setusereamil("");
          setuserphone("");
          setuserdob("");
          setusernic("");
        setuserpassword("");
        getContext.setUserAccount(data.message);
        }
        getContext.set_IfUserLogin(true);
        getNavigate('/home')
      }
      else {
        if(!getuseremail || !getuserpassword){
          toast.error("All Field are required ");
          return;
        }
        if(!validateEmail(getuseremail)){
          toast.error("Email Not Valid");
          return;
        }
        
        const form_data=new FormData(e.target);
        const { data } = await axios.post("http://localhost:5000/user/login", form_data, { 
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials:true
        });
        
        if(data.success){
          toast.success("Login Successfully");
          getContext.setUserAccount(data.message);

        }
        getContext.set_IfUserLogin(true);
        getNavigate('/home')

      }
    }
    catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div id='user_register'>
      
      <div className="form_box" style={{ textAlign: IsLoggedIn ? "center" : 'left' }}>
        <div className="formtype">
          <h1>{IsLoggedIn ? "Sign Up " : "Sign In"}</h1>
        </div>
        <span id='signup_required' >User {IsLoggedIn ? "Logged In" : "Sign Up"} Required</span>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero maxime itaque asperiores facilis hic beatae in eaque fugiat cumque architecto.</p>
        {
          IsLoggedIn
            ? <form ref={formInput} action="#" onSubmit={(e) => submitForm(e)} >
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
                <input type="Number" name='usernic' value={getusernic} onChange={(e) => { setusernic(e.target.value) }} placeholder='NIC' />
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
                <a onClick={(e) => { setIsLoggedIn(!e) }} style={{ textDecoration: 'none', fontSize: '13px', color: 'white' }}>You have registred ? Login</a>
              </div>

              <div id="user_signup">
                <button>Register</button>
              </div>
            </form>
            :
            <form onSubmit={(e) => { submitForm(e) }} action="#" style={{ display: 'flex', flexDirection: 'column' }}>

              <div className="useremail">
                <input type="text" name='useremail' value={getuseremail} onChange={(e)=> setusereamil(e.target.value)} placeholder='Email' />
              </div>
              <div>
                <input type="text" name='userpassword' value={getuserpassword} placeholder='Password' onChange={(e)=> setuserpassword(e.target.value)} />
              </div>

              <div className="new_acc">
                <a onClick={() => { setIsLoggedIn(!IsLoggedIn) }} style={{ textDecoration: 'none', cursor: 'pointer', fontSize: '13px', color: 'white' }}>New User ? Signup </a>
              </div>
              <div id="user_Login">
                <button>Login</button>
              </div>
            </form>
        }

      </div>
    </div>
  )
}

export default Register
