import React, { useContext, useEffect, useRef, useState } from 'react'
import { isCookie, Link, useNavigate } from 'react-router-dom'
import '../App.css'
import { Contex } from '../Cont/Contex'
import { toast } from 'react-toastify';
import { GiPalmTree } from "react-icons/gi";
import { GiIndiaGate } from "react-icons/gi";
import reactIcon from '../assets/react.svg';


function Navbar() {
  const getContext = useContext(Contex);
  const getNavigate = useNavigate();
  const [getUserImage,setUserImage]=useState([ 
    "avatar1",
    "avatar2",
    "avatar3",
    "avatar5",
  ])
  
  const str_first="Lorem";

  let i=0;
  let newString="";

  const logoutfun = () => {
    getContext.set_IfUserLogin(false);
    toast.warn("Logout Succefully ");
    getContext.setUserAccount("");
    getNavigate("/auth");
  }


  


  return (
    <>
      <div className="nav-container">
        <div className="some_text">
          <div className="left_side">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur expedita corrupti qui perspiciatis beatae optio.</div>
         
          <div className="mid_side"></div>
          <div className="last_side">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis iusto blanditiis quos hic tenetur repellendus sint nemo odit assumenda laudantium.</div>
        </div>
        <div className="logo">
          <GiPalmTree color='coral' ></GiPalmTree>
          <div className="logo_names">
            <p>SYS</p>
            <p>Save Your Life</p>
          </div>

        </div>
        <div className="nav_heading">
          <div className="nav_head">
            <GiIndiaGate></GiIndiaGate>
            <div className="headings">
              <p>India's No. 1 Hospital</p>
              <p>Your health is our priority. With timely care, proper medication, and lifestyle changes, we’ll work together for your recovery</p>
            </div>
          </div>
        <ul className="nav-links">
          <Link to={'/home'}>Home</Link>
          <Link to={'/appointment'}>Appointment</Link>
          <Link to={'/about'}>AboutUs</Link>
        </ul>
        </div>
        <div className="log_logout">
          <div className="user_profile_icon">
          
             {
              !getContext.getUserAccount
              ?  <img src="/img/docBack2.jpg" alt="" />
              :  <img src={`/img/${getUserImage[Math.floor(Math.random() * 3) + 1]}.png`} alt="" />
            }
           
          </div>
          <span>
            {
              !getContext.getUserAccount
              ? ""
              : getContext.getUserAccount.username
            }
          </span>
          {
            getContext.get_IfUserLogin
              ? <Link onClick={logoutfun} >logout</Link>
              : <Link to={'/auth'}>login</Link>
          }

        </div>
      </div>
    </>
  )
}

export default Navbar
