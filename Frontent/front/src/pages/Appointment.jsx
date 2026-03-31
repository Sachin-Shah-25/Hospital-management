import axios from 'axios';
import React, { useContext, useEffect, useState, useRef } from 'react'
import { use } from 'react';
import { toast } from 'react-toastify';
import { Contex } from '../Cont/Contex';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import ChatBot from '../components/ChatBot'
import aiv from '../assets/img/p1.mp4'
function Appointment() {
  const { setUserAccount, getUserAccount } = useContext(Contex);
  const [getUserFirstName, setUserFirstName] = useState("");
  const [getUserLastName, setUserLastName] = useState("");
  const [getUserEmail, setUserEmail] = useState("");
  const [getUserPhone, setUserPhone] = useState("");
  const [getUserNic, setUserNic] = useState("");
  const [getUserDOB, setUserDob] = useState("");
  const [getUserGender, setUserGender] = useState("");
  const [getUserAdd, setUserAdd] = useState("");
  const [getUserAptDate, setUserAptDate] = useState("");
  const [getUserSelectDept, setUserSelectDept] = useState("Ortho");
  const [getUserSelectDoctor, setUserSelectDoctor] = useState("");
  const [getAllDoctorName, setAllDoctorName] = useState([]);
  const [isUserVisited, setIsUserVisited] = useState(false);
  const getNavigate = useNavigate();
  const getRef = useRef("")
  const [loadingText, setLoadingText] = useState(false)

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["search", "allData"],
    queryFn: async function () {
      console.log("hi")
      const res = await axios.get("http://localhost:5000/admin/doctors");
      const data = res.data?.data;
      console.log(data)
      return data
    }
  })


  const getAllDoctor = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/admin/doctors/${getUserSelectDept}`, { withCredentials: true });
      if (data.success || data.status == 200) {
        setAllDoctorName(data.message);
      }
      else {
        throw new Error("Not Found")
      }
    } catch (error) {

      toast.error(error.message || "Something went wrong");
      console.log(error.message || "Something Went wrong")
    }
  }



  $(document).ready(() => {
    $("#appoint_data").click(() => {
      $("#appoint_input").attr("type", "date");
    });
    $("#dob_data").click(() => {
      $("#dob_input").attr("type", "date");
    })
  });



  const bookAppFun = async (e) => {
    e.preventDefault();
    try {
      if (!getUserLastName || !getUserFirstName || !getUserEmail || !getUserNic || !getUserPhone || !getUserDOB || !getUserGender || !getUserAptDate || !getUserAdd) {
        toast.warn("All Filed are Requried");
        return;
      }
      if (getUserPhone.length > 10) {
        toast.error("Invalid Phone Number")
        return
      }
      const patt = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!patt.test(getUserEmail)) {
        toast.error("Email is not valid");
        return;
      }

      const appointForm = new FormData(e.target)
      console.log(Object.fromEntries(appointForm))
      const { data } = await axios.post("http://localhost:5000/user/bookappointment", appointForm, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(data)
      if (data.success || data.status == 201) {
        toast.success("Appointment Book Successfully");
        setUserFirstName("")
        setUserLastName("");
        setUserAdd("");
        setUserAptDate("");
        setUserEmail("");
        setUserDob("");
        setUserGender("");
        setUserNic("");
        setUserSelectDept("");
        setUserSelectDoctor("");
        getNavigate("/")
      }
    } catch (error) {
      const status = error.response.status
      const msg = error.response.data.message
      if (status == 401) {
        toast.error(msg)
        getNavigate("/auth")
      }
      else if (status == 403) {
        getNavigate("/auth")
        toast.error(msg)
      }
      else {
        toast.error("Something went wrong");
        console.log("An error Occured : ", error.message)

      }
    }
  }
  useEffect(() => {
    if (data && !isError) {
      setAllDoctorName(() => {
        const filterData = data.filter(
          (det) => det.dep === getUserSelectDept
        );

        console.log(filterData);

        const uniqueNames = [...new Set(filterData.map(d => d.name))];

        console.log(uniqueNames);

        return uniqueNames;
      });
    }
   
    }, [getUserSelectDept]);

  const summarizeText = () => {
    setLoadingText(true)
    setUserAdd("")
    const timeOutId = setTimeout(async () => {

      console.log("Hi")
      if (getUserAdd.trim() === "") {
        getRef.current.focus()
        setLoadingText(false)
        clearTimeout(timeOutId)
        return;
      }

      try {
        console.log("text", getUserAdd)
        const { data } = await axios.post("http://localhost:5000/sum", { message: getUserAdd });
        if (data.success && data.res.role === "assistant") {
          console.log(data.res.content)
          setUserAdd(data.res.content)

        }
      }
      catch (e) {
        console.log("coudn't process")
      }
      setLoadingText(false)
    }, 2000)
  }
  return (
    <div className="appoint_form">
      <form onSubmit={(e) => bookAppFun(e)}>

        <h2 className="form-title">Book Appointment</h2>

        <div className="form-grid">

          <input type="text" value={getUserFirstName} name='firstname'
            onChange={(e) => setUserFirstName(e.target.value)}
            placeholder='First Name' />

          <input type="text" value={getUserLastName} name='lastname'
            onChange={(e) => setUserLastName(e.target.value)}
            placeholder='Last Name' />

          <input type="email" value={getUserEmail} name='email'
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder='Email' />

          <input type="tel" value={getUserPhone} name='phone'
            onChange={(e) => setUserPhone(e.target.value)}
            placeholder='Phone Number' max={10} />

          <input type="text" value={getUserNic} name='nic'
            onChange={(e) => setUserNic(e.target.value)}
            placeholder='NIC' />

          <input type="date" value={getUserDOB} name='dob'
            onChange={(e) => setUserDob(e.target.value)} />

          <select value={getUserGender}
            onChange={(e) => setUserGender(e.target.value)}>
            <option>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <input type="date" value={getUserAptDate} name='appdate'
            onChange={(e) => setUserAptDate(e.target.value)} />

          <select value={getUserSelectDept}
            onChange={(e) => setUserSelectDept(e.target.value)}>
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

          <select value={getUserSelectDoctor}
            onChange={(e) => setUserSelectDoctor(e.target.value)}>
            {
              getAllDoctorName.map((elem, index) => (
                <option key={index}>{elem}</option>
              ))
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
            <textarea ref={getRef}
              className="full-width textarea_wrapper"
              rows={10}
              value={getUserAdd}
              onChange={(e) => setUserAdd(e.target.value)}
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

        <div className="checkbox">
          <label>
            <input type="checkbox"
              onChange={() => setIsUserVisited(prev => !prev)} />
            Already Visited?
          </label>
        </div>

        <button className="submit-btn">Book Appointment</button>

      </form>
    </div>
  )
}

export default Appointment
