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
const VITE_BASE_URL =import.meta.env.VITE_BASE_URL

import { useQueryClient } from "@tanstack/react-query";


export const Navbar = ()=> {
  const queryClient = useQueryClient();
  const getContext = useContext(Contex);
  const getNavigate = useNavigate();
  const [getUserImage, setUserImage] = useState([
    "avatar1",
    "avatar2",
    "avatar3",
    "avatar5",
  ])


 
  const logoutfun = async () => {
    const data = await axios.get(`${VITE_BASE_URL}/logout`, { withCredentials: true })
    if (data.status == 200) {
      getContext.set_IfUserLogin("");
      toast.warn("Logout Succefully ");
      getNavigate("/auth");
    }
    else {
      toast.error("Something went wrong")
    }

  }

  return (
  <div className="nav-container">
    <div className="nav_heading">

      <div className="user_profile_icon">
        <motion.img style={{cursor:"pointer"}} onClick={()=>getNavigate("/profile")}
          initial={{ opacity: 0, scale: 0,cursor:"pointer" }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", bounce: 0.5 },
          }}
          src={doc4}
        />
        <span className="logo-text">MediCare</span>
      </div>

      <ul className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/appointment">Appointment</Link>
        <Link to="/about">About Us</Link>
      </ul>

      <div className="log_logout">
        {
          
          getContext.get_IfUserLogin
            ? <Link onClick={logoutfun} className="logout-btn">Logout</Link>
            : <Link to="/auth" className="login-btn">Login</Link>
        }
      </div>

    </div>
  </div>
  )
  
    

}

