import React, { useContext, useEffect, useCallback, useState, useRef } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { Contex } from '../Cont/Contex.jsx'
import { Navbar } from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import doctor5 from "../assets/img/doctor5.webp"
import docBack2 from "../assets/img/docBack2.jpg"
import doctor10 from "../assets/img/doctor10.webp"
import doctor11 from "../assets/img/doctor11.webp"
import doctor1 from "../assets/img/doctor1.webp"
import doctor7 from "../assets/img/dcotor7.webp"
import doctor2 from "../assets/img/doctor2.webp"
import doctor8 from "../assets/img/doctor8.webp"
import doc4 from "../assets/img/doc4.png"
import doc1 from "../assets/img/doc1.png"
import { Link } from 'react-router-dom'
import Dep from '../components/Dep.jsx'
import axios from 'axios'
import { Help } from '../components/Help.jsx'

import { useQuery } from "@tanstack/react-query";

function Home() {
  const [getInd, setInd] = useState(0);
  const { getDoctorsDetails, set_IfUserLogin, get_IfUserLogin } = useContext(Contex)
  const ref = useRef()


  const dep = [
    {
      icon: "fa-solid fa-eye",
      label: "Radiology"
    },
    {
      icon: "fa-solid fa-heart-pulse",
      label: "Neurology"
    },
    {
      icon: "fa-solid fa-ear-deaf",
      label: "ENT"
    },
    {
      icon: "fa-solid fa-bone",
      label: "Ortho"
    },
    {
      icon: "fa-solid fa-heart-pulse",
      label: "Cardiology"
    },
    {
      icon: "fa-solid fa-brain",
      label: "Physyo"
    }
  ];

  const lastWords = [
    "Wellness",
    "Future",
    "Safety",
    "Smile",
    "Life",
    "Family",
    "Happiness",
    "Care",
    "Trust",
    "Journey"
  ];

  useEffect(() => {
    let id = setTimeout(() => {
      setInd(prev => prev + 1 >= lastWords.length ? 0 : prev + 1)
    }, 1000)
    return () => clearTimeout(id);
  }, [getInd])

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`${VITE_BASE_URL}/me`, {
        withCredentials: true
      });
      set_IfUserLogin(data);
    };

    fetchUser();
  }, []);

  return (
    <div ref={ref} className='home'>
      <Navbar  ></Navbar>
      <div className="hero_section">

        <div className="hero_section_container_left">
          <h1>
            WE CARE ABOUT YOUR{"...."}
            <br></br>
            <span className="highlight">{lastWords[getInd]}</span>
          </h1>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus facilis quae molestias quis est voluptatum cumque exercitationem!
          </p>

          <Link to="/appointment">
            <button className="hero-btn">Book Appointment</button>
          </Link>
        </div>

        <div className="hero_section_container_right">
          <img src={doctor8} alt="doctor" />
        </div>

      </div>

      <div className='hero_section_2'>

        <div className='hero_section_container_left'>
          <h1>Welcome To Our Hospital</h1>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus facilis quae molestias quis est voluptatum
            Lorem ipsum dolor sit amet consectetur.
          </p>

          <div className="hero-btn-group">
            <button className="outline-btn">Find Doctors</button>

            <Link to="/appointment">
              <button className="primary-btn">Appointment</button>
            </Link>
          </div>
        </div>

        <div className="hero_section_container_right">
          <img className="bg-img" src={docBack2} alt="background" />
        </div>

      </div>

      <div className='over_dep'>

        <div className='over_dep_heading'>
          <h2 className="sub-heading">
            <span></span> Our Departments <span></span>
          </h2>

          <h1 className="main-heading">Our Medical Services</h1>
        </div>

        <div className='cat'>
          {
            dep.map((det, ind) => (
              <Dep depDet={det} key={ind} />
            ))
          }
        </div>

        <div className="dep">
          <div className='inner_dep'>

            <div className='dep_left'>
              <h1>
                <span className="highlight">
                  {getDoctorsDetails.length > getInd ? getDoctorsDetails[getInd].dep : "Cardiology"}
                </span>{" "}
                with  {getDoctorsDetails.length > getInd ? getDoctorsDetails[getInd].exp : "4"} Years Experience
              </h1>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sequi et asperiores accusamus quibusdam temporibus ullam.
              </p>

              <Link to="/appointment">
                <button className="primary-btn">
                  Appointment
                </button>
              </Link>
            </div>

            <div className='dep_right'>
              <AnimatePresence>
                <motion.img
                  className='showImage'
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                  src={
                    doctor10
                  }
                />
              </AnimatePresence>
            </div>

          </div>
        </div>

        <div className="our_doct">

          <div className="section-title">
            <span></span>
            <h1>Our Specialist</h1>
            <span></span>
          </div>

          <div className='our_doct_con'>

            {[
              { img: doctor8, name: "Dr. Ms Smit", dep: "Orthopedics" },
              { img: doctor11, name: "Dr. Neha Verma", dep: "Neurology" },
              { img: doctor1, name: "Dr. Arjun Mehta", dep: "Cardiology" },
              { img: doctor10, name: "Dr. Karan Kapoor", dep: "Radiology" }
            ].map((doc, i) => (
              <div className='doct_detail' key={i}>
                <div className="doc_image">
                  <img src={doc.img} alt="" />
                </div>
                <div className='details'>
                  <h2>{doc.name}</h2>
                  <span>{doc.dep}</span>
                </div>
              </div>
            ))}

          </div>
        </div>
        <Help />
      </div>
      <Footer></Footer>

    </div>
  )
}

export default Home
