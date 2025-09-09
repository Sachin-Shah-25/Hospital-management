import React, { useContext, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";

import { isCookie, Link, useNavigate } from 'react-router-dom'
import '../App.css'
import { Contex } from '../Cont/Contex'
import { toast } from 'react-toastify';
import { GiPalmTree } from "react-icons/gi";
import { GiIndiaGate } from "react-icons/gi";
import reactIcon from '../assets/react.svg';
import axios from 'axios';
import doc4 from "../assets/img/doc4.png"


function Navbar() {
  const getContext = useContext(Contex);
  const getNavigate = useNavigate();
  const [getUserImage,setUserImage]=useState([ 
    "avatar1",
    "avatar2",
    "avatar3",
    "avatar5",
  ])
  


  const logoutfun = async() => {
    const data=await axios.get("http://localhost:5000/logout",{withCredentials:true})
    console.log(data)
    if(data.status==200){
      getContext.set_IfUserLogin("");
      toast.warn("Logout Succefully ");
      getContext.setUserAccount("");
      getNavigate("/auth");
    }
    else {
      toast.error("Something went wrong")
    }

  }

  return (
    <>
      <div className="nav-container">
        <div className="nav_heading">
          <div className="user_profile_icon">
            
          <motion.img
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.4,
                scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
            }}
            src={doc4}
            ></motion.img>
             
           
          </div>
         
        <ul className="nav-links">
          <Link to={'/'}>Home</Link>
          <Link to={'/appointment'}>Appointment</Link>
          <Link to={'/about'}>AboutUs</Link>
        </ul>
        <div className="log_logout">
       
          {
            getContext.get_IfUserLogin
              ? <Link onClick={logoutfun} >logout</Link>
              : <Link to={'/auth'}>login</Link>
          }

        </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
