import axios from 'axios';
import React, { useContext, useEffect, useState, useRef } from 'react'
import { use } from 'react';
import { toast } from 'react-toastify';
import { Contex } from '../Cont/Contex';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import ChatBot from '../components/ChatBot'
import Loader from '../pages/Loader'
import aiv from '../assets/img/p1.mp4'
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL
function Appointment() {
  const { setUserAccount, getUserAccount } = useContext(Contex);
  const [getAllDoctorName, setAllDoctorName] = useState([]); // imp
  const [getInvalidDetial, setInvalidDetail] = useState(null); // imp
  const [isUserVisited, setIsUserVisited] = useState(false);
  const [loadingText, setLoadingText] = useState(false);
  const [getMaxDate, setMaxDate] = useState("")
  const [getMinDate, setMinDate] = useState("")
  const [getSlots, setSlots] = useState(null)
  const [getBookDocName, setBookDocName] = useState(null)
  const getNavigate = useNavigate();
  const getRef = useRef("")
  const currentRequest = useRef("")
  const controllerRef = useRef("")
  const bookRef = useRef("")
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: "",
    nic: "",
    gender: "",
    appdate: "",
    dep: "Ortho",
    doctor: "",
    condition: "",
    time: ""
  });


  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["search", "allData"],
    queryFn: async function () {
      const res = await axios.get(`${VITE_BASE_URL}/admin/doctors`);
      const data = res.data?.data;
      return data
    }
  })

  const getUserDetails = (e) => {
    setUserData(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  const getAllDoctor = async () => {
    try {
      if (currentRequest.current) {
        currentRequest.current.abort();
      }
      const control = new AbortController();
      currentRequest.current = control;
      const { data } = await axios.get(`${VITE_BASE_URL}/admin/doctors/${getUserSelectDept}`, { withCredentials: true, signal: currentRequest.control.signal });
      if (data.success || data.status == 200) {
        setAllDoctorName(data.message);
      }
      else {
        throw new Error("Not Found")
      }
    } catch (error) {
      if (error.name == "AbortError") {
        console.log("Request Cancel")
      }
      toast.error(error.message || "Something went wrong");
      console.log(error.message || "Something Went wrong")
    }
  }


  const bookAppFun = async (e) => {
    e.preventDefault();
    try {
      if (bookRef.current) {
        bookRef.current.abort()
      }
      const control = new AbortController;
      bookRef.current = control;
      for (let key in userData) {
        if (userData[key] === "") {
          setInvalidDetail("!! All Filed are Requried")
          return;
        }
        if (userData["age"] <= 10 && Number.isNaN(Number(userData.age))) {
          setInvalidDetail("Please Enter correct Age")
          return;
        }
        if (Number.isNaN(Number(userData.phone))) {
          setInvalidDetail("Phone Number is Invalid")
          return;
        }
      }
      const patt = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!patt.test(userData.email)) {
        toast.error("Email is not valid");
        return;
      }
      const { data } = await axios.post("http://localhost:5000/user/bookappointment", userData, {
        withCredentials: true,

        signal: control.signal
      });
      if (data.success || data.status == 201) {
        toast.success("Appointment Book Successfully, please check detail in email");
        setUserData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          age: "",
          nic: "",
          gender: "",
          appdate: "",
          dep: "Ortho",
          doctor: "Sachin Shah",
          condition: "",
          time: ""
        })
        getNavigate("/")
      }
    } catch (error) {
      console.log(error.message)
      const status = error.response.status || 500
      const msg = error.response.data.message || "Something went wrong"
      if (status == 401) {
        toast.error(msg)
        getNavigate("/auth")
      }
      else if (status == 403) {
        getNavigate("/auth")
        toast.error(msg)
      }
      else if (status == 409) {
        toast.error(msg)
      }
      else {
        toast.error("Something went wrong");
        console.log("An error Occured : ", error.message)

      }
    }
  }

  const summarizeText = () => {
    setLoadingText(true)
    if (controllerRef.current) {
      controllerRef.current.abort()
    }
    const control = new AbortController()
    controllerRef.current = control
    const timeOutId = setTimeout(async () => {

      if (userData.condition.trim() === "") {
        getRef.current.focus()
        setLoadingText(false)
        clearTimeout(timeOutId)
        return;
      }

      try {
        const { data } = await axios.post(`${VITE_BASE_URL}/sum`, { message: userData.condition }, { signal: control.signal });
        if (data.success && data.res.role === "assistant") {
          setUserData({ ...userData, condition: data.res.content })
        }
      }
      catch (e) {
        if (e.name === "CanceledError") {
          console.log("Request cancelled");
        } else {
          console.log("couldn't process");
        }
      }
      setLoadingText(false)
    }, 2000)
  }
  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${VITE_BASE_URL}/user/myapp`, { withCredentials: true, });
      setBookDocName(res.data.booked.map(item => item.doctorname))
    } catch (err) {
      if (err.response?.status == 403) {
        getNavigate("/")
      }
      console.error(err);
    }
  };


  useEffect(() => {

    if (data && !isError) {
      const filterData = data.filter(
        (det) => det.dep === userData.dep && !getBookDocName.includes(det.name)
      );
      setAllDoctorName(() => {

        const uniqueNames = [
          ...new Set(
            filterData
              .filter(d => d.name && !getBookDocName.includes(d.name))
              .map(d => d.name)
          )
        ];


        return uniqueNames;
      });
      setSlots(filterData[0]?.available.time)
    }
  }, [userData.dep]);

  useEffect(() => {

    const dt = new Date();
    dt.setDate(dt.getDate() + 1)
    const minDate = dt.toISOString().split("T")[0];

    const dt1 = new Date();
    dt1.setDate(dt.getDate());
    const maxDate = dt1.toISOString().split("T")[0];

    setMinDate(minDate);
    setMaxDate(maxDate);

    fetchUserData()
  }, [])

  if (isLoading) {
    <Loader />
  }
  if (isError) {
    navigate("/")
  }

  return (
    <div className="appoint_form">
      <form onSubmit={(e) => bookAppFun(e)}>

        <h2 className="form-title">Book Appointment</h2>
        <h4 style={{ width: "100%", textAlign: "center", marginBottom: "30px", color: "red" }}>
          {
            getInvalidDetial && getInvalidDetial
          }
        </h4>
        <div className="form-grid">

          <input onFocus={() => setInvalidDetail(null)} type="text" value={userData.firstName} name='firstName'
            onChange={(e) => getUserDetails(e)}
            placeholder='First Name' />

          <input onFocus={() => setInvalidDetail(null)} type="text" value={userData.lastName} name='lastName'
            onChange={(e) => getUserDetails(e)}
            placeholder='Last Name' />

          <input onFocus={() => setInvalidDetail(null)} type="text" value={userData.age} minLength={2} maxLength={2} name='age'
            onChange={(e) => getUserDetails(e)}
            placeholder='Enter Your Age' />


          <input onFocus={() => setInvalidDetail(null)} type="email" value={userData.email} name='email'
            onChange={(e) => getUserDetails(e)}
            placeholder='Email' />

          <input onFocus={() => setInvalidDetail(null)} type="tel" value={userData.phone} name='phone'
            onChange={(e) => getUserDetails(e)}
            placeholder='Phone Number' maxLength={10} />

          <input onFocus={() => setInvalidDetail(null)} maxLength={6} type="text" value={userData.nic.toUpperCase()} name='nic'
            onChange={(e) => getUserDetails(e)}
            placeholder='NIC' />

          <select onFocus={() => setInvalidDetail(null)} name="gender" value={userData.gender}
            onChange={(e) => getUserDetails(e)}>
            <option>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input type="date" onFocus={() => setInvalidDetail(null)} min={getMinDate} max={getMaxDate} name='appdate'
            onChange={(e) => getUserDetails(e)} />

          <select onFocus={() => setInvalidDetail(null)} value={userData.dep} name="dep"
            onChange={(e) => getUserDetails(e)}>
            <option>Radiology</option>
            <option>ENT</option>
            <option>Gynecology</option>
            <option>Psychiatry</option>
            <option>Urology</option>
            <option>Pediatrics</option>
            <option>Dermatology</option>
            <option>Orthopedics</option>
            <option>Neurology</option>
          </select>

          <select
            onFocus={() => setInvalidDetail(null)}
            name="doctor"
            value={userData.doctor || ""}
            onChange={(e) => getUserDetails(e)}
          >
            <option value="" disabled>Doctor</option>

            {
              getAllDoctorName.map((elem, index) => (
                <option key={index} value={elem}>
                  {elem}
                </option>
              ))
            }
          </select>
          <select
            onFocus={() => setInvalidDetail(null)} value={userData.time || ""} name="time"
            onChange={(e) => getUserDetails(e)}
          >
            <option value="" disabled>Select Time</option>
            {
              getSlots && getSlots.map((time) => {
                return !time.book ? (
                  <option key={time.slot} value={time.slot}>{time.slot}</option>
                ) : null
              })
            }
          </select>

        </div>
        <div className="text_cont" >
          <div className="text_cont1" onClick={summarizeText}>
            <div style={{ width: "50px", height: "50px" }}>

              <video src={aiv} autoPlay muted loop className="text_cont2">
              </video>
            </div>
            <span>help me...</span>
          </div>
          <div style={{ position: "relative", width: "100%" }}>
            <textarea
              name="condition"
              ref={getRef}
              className="full-width textarea_wrapper"
              rows={10}
              value={userData.condition}
              onChange={(e) => getUserDetails(e)}
              placeholder='Describe your health issue...'
            > </textarea>
            {
              loadingText
                ? <div className="overlay">  <div style={{ width: "50px", height: "50px" }}>

                  <video src={aiv} autoPlay muted loop className="text_cont2">
                  </video>
                </div></div>
                : ""

            }

          </div>
        </div>

        {/* <div className="checkbox">
          <label>
            <input onFocus={()=>setInvalidDetail(null)} type="checkbox"
              onChange={() => setIsUserVisited(prev => !prev)} />
            Already Visited?
          </label>
        </div> */}

        <button className="submit-btn">Book Appointment</button>

      </form>
    </div>
  )
}

export default Appointment
