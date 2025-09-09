import React, { useContext, useEffect, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { Contex } from '../Cont/Contex.jsx'
import Navbar from '../components/Navbar.jsx'
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
function Home() {
  const [getInd, setInd] = useState(0)
  const { details ,setDetails,getDoctorsDetails} = useContext(Contex)
  const [show, setShow] = useState(false)
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
    setShow(false)
    const timeout = setTimeout(() => {
      setShow(true)
    }, 50)
    return () => clearTimeout(timeout)
  }, [details])
  useEffect(() => {
    const getInterval = setInterval(() => {

      setInd((prev) => {
        if (prev >= lastWords.length - 1) {
          return 0
        }
        else {
          return prev + 1
        }
      })
    }, 1500)

    return () => {
      clearInterval(getInterval)
    }
  }, [])

  useEffect(()=>{
    setDetails(getDoctorsDetails[getInd])
  },[getInd])
  return (
    <div className='home'>
      <Navbar></Navbar>

      <div className="hero_section">
        <div className='hero_section_container_left'>
          <h1>WE CARE ABOUT YOUR <span style={{ color: "#6c6cff" }}>{lastWords[getInd]}</span></h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus  facilis quae molestias quis est voluptatum cumque exercitationem! Optio?</p>

          <Link to={"/appointment"}> <button>Appointment</button> </Link>
        </div>
        <div className="hero_section_container_right">
          <img src={doctor8} alt="" style={{ width: "100%", height: "100%", objectFit: 'cover' }} />
        </div>
      </div>

      <div className='hero_section_2'>
        <div className='hero_section_container_left'>
          <h1>Welcome To Our Hospital</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus  facilis quae molestias quis est voluptatum Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, dolorum? cumque exercitationem! Optio?</p>

          <button style={{ display: "block", border: "none" }}>Find Doctors</button>
          <Link to={"/appointment"}> <button style={{ border: "none" }}>Appointment</button> </Link>
        </div>
        <div className="hero_section_container_right">
          <img src={docBack2} alt="" style={{ width: "100%", height: "100%", objectFit: 'cover' }} />
          <img id='img2' src={doctor2} alt="" style={{ width: "100%", height: "100%", objectFit: 'cover' }} />
        </div>
      </div>

      <div className='over_dep'>
        <div className='over_dep_heading'>
          <h2> <span ></span> Over Departments <span></span></h2>
          <h1 style={{ fontSize: "3rem", marginTop: '30px' }}>Our Medical Services</h1>

        </div>
        <div className='cat'>
          {
            dep.map((det, ind) => {
              return <Dep depDet={det} key={ind} ></Dep>
            })
          }
          {/* <div  onClick={(e)=>getSelectDoctorDetails(e)} style={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}>
            <i className="fa-solid fa-eye" style={{
              display: 'block',
              fontSize: "5rem"
            }}></i>
            <span>Radiology</span>
          </div>
          <div onClick={(e)=>getSelectDoctorDetails(e)} style={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}>
            <i className="fa-solid fa-heart-pulse" style={{
              display: 'block',
              fontSize: "5rem"
            }}></i>
            <span>Neurology
            </span>
          </div>
          <div onClick={(e)=>getSelectDoctorDetails(e)} style={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}>
            <i className="fa-solid fa-ear-deaf" style={{
              display: 'block',
              fontSize: "5rem"
            }}></i>
            <span>ENT</span>
          </div>
          <div onClick={(e)=>getSelectDoctorDetails(e)} style={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}>
            <i className="fa-solid fa-bone" style={{
              display: 'block',
              fontSize: "5rem"
            }}></i>
            <span>Ortho</span>
          </div>
          <div onClick={(e)=>getSelectDoctorDetails(e)} style={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}>
            <i className="fa-solid fa-heart-pulse" style={{
              display: 'block',
              fontSize: "5rem"
            }}></i>
            <span>Cardiology</span>
          </div>
          <div onClick={(e)=>getSelectDoctorDetails(e)} style={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}>
            <i className="fa-solid fa-brain" style={{
              display: 'block',
              fontSize: "5rem"
            }}></i>
            <span>Pyhsyo</span>
          </div> */}
        </div>
        <div className="dep">
          <div className='inner_dep'>
            <div className='dep_left'>
              <h1><span style={{color:"#009dff"}} >{details ? details.dep : "Cardiology"}</span> with 12 Years Experience</h1>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi et asperiores accusamus quibusdam temporibus ullam placeat id exercitationem ea. Labore beatae necessitatibus magnam vero perspiciatis fuga consectetur, ipsa molestias nam.</p>
              <Link to={"/appointment"}> <button>{
                details
                  ? details.name
                  : "Appointment"
              }</button> </Link>
            </div>
            <div className='dep_right'>
              <AnimatePresence>
              <motion.img
                className='showImage'
                initial={{ opacity: 0, scale: 0.1 }}
                animate={{ opacity: show?1:0, scale: show?1:0 }}
                transition={{ duration: 0.5 }}
                src={
                  details
                    ? `http://localhost:5000/img/${details.image}`
                    : doctor10
                } alt="" />
                </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="our_doct">
          <h1 style={{ display: "flex", alignItems: "baseline", justifyContent: "center" }} >
            <span style={{ width: "150px", height: '5px', backgroundColor: "#559af3", display: 'inline-block', marginRight: "20px" }}></span>
            <h1 style={{ color: "#000e54" }}>Our Specialist </h1>
            <span style={{ width: "150px", height: '5px', backgroundColor: "#559af3", display: 'inline-block', marginLeft: "20px" }}></span>
          </h1>
          <div className='our_doct_con'>
            <div className='doct_detail'>
              <div className="doc_image">
                <img src={doctor5} alt="" />
              </div>
              <div className='details'>
                <h2 style={{ marginTop: '10px' }}>Dr. Ms Smit</h2>
                <span style={{ marginTop: "5px", display: "block" }}>Orthopedics</span>
              </div>

            </div>
            <div className='doct_detail'>
              <div className="doc_image">
                <img src={doctor11} alt="" />
              </div>
              <div className='details'>
                <h2 style={{ marginTop: '10px' }}>Dr. Neha Verma</h2>
                <span style={{ marginTop: "5px", display: "block" }}>Neurology</span>
              </div>

            </div>
            <div className='doct_detail'>
              <div className="doc_image">
                <img src={doctor1} alt="" />
              </div>
              <div className='details'>
                <h2 style={{ marginTop: '10px' }}>Dr. Arjun Mehta</h2>
                <span style={{ marginTop: "5px", display: "block" }}>Cardiology</span>
              </div>

            </div>
            <div className='doct_detail'>
              <div className="doc_image">
                <img src={doctor7} alt="" />
              </div>
              <div className='details'>
                <h2 style={{ marginTop: '10px' }}>Dr. Karan Kapoor</h2>
                <span style={{ marginTop: "5px", display: "block" }}>Radiology</span>
              </div>

            </div>

          </div>
        </div>
      </div>
      <Footer></Footer>

    </div>
  )
}

export default Home
