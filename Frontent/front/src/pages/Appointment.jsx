import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { use } from 'react';
import { toast } from 'react-toastify';
import { Contex } from '../Cont/Contex';
import { useNavigate } from 'react-router-dom';
function Appointment() {
  const {setUserAccount}=useContext(Contex);
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
  const [isUserVisited , setIsUserVisited]=useState(false);

  const getNavigate=useNavigate();




  const getAllDoctor = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/admin/doctors/${getUserSelectDept}`);
      setAllDoctorName(data.message);
    } catch (error) {
      toast.error("Something Went Wrong ");
    }
  }

  useEffect(() => {
    getAllDoctor();
  }, [getUserSelectDept]);

  $(document).ready(() => {
    $("#appoint_data").click(() => {
      $("#appoint_input").attr("type", "date");
    });
    $("#dob_data").click(() => {
      $("#dob_input").attr("type", "date");
    })
  });



  useEffect(() => {
  }, [getUserSelectDoctor]);

  const bookAppFun = async (e) => {
    e.preventDefault();

    try {
      const appoint_Form = new FormData(e.target)
      if (!getUserLastName || !getUserFirstName || !getUserEmail || !getUserNic || !getUserPhone || !getUserDOB || !getUserGender || !getUserAptDate || !getUserAdd) {
       
        toast.warn("All Filed are Requried");
        return;
      }
      const patt = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!patt.test(getUserEmail)) {
        toast.error("Email is not valid");
        return;
      }

      const now = new Date();
      if (getUserAptDate <= now.toLocaleDateString().toString()) {
        toast.error("Appointment Date is Not available");
        return;
      }


      const appointForm = new FormData(e.target)
     
      const { data } = await axios.post("http://localhost:5000/user/bookappointment", appointForm, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (data.success) {
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
        getNavigate("/home")

        setUserAccount(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
   
    <div className="appoint_form">
      <form action="#" onSubmit={(e) => { bookAppFun(e) }}>
        <div className="userfirstname">
          <input type="text" value={getUserFirstName} name='firstname' onChange={(e) => { setUserFirstName(e.target.value) }} placeholder='First Name' />
        </div>
        <div className="userlastname">
          <input type="text" value={getUserLastName} onChange={(e) => { setUserLastName(e.target.value) }} name='lastname' placeholder='LastName' />
        </div>
        <div className="useremail">
          <input type="text" value={getUserEmail} onChange={(e) => { setUserEmail(e.target.value) }} name='email' placeholder='Email' />
        </div>
        <div className="userphone"  >
          <input type="number"
            value={getUserPhone} name='phone' onChange={(e) => { setUserPhone(e.target.value) }} placeholder='Phone Number' />
        </div>
        <div className="nic">
          <input type="number" value={getUserNic} name='nic' onChange={(e) => { setUserNic(e.target.value) }} placeholder='NIC' />
        </div>
        <div className="dob" id='dob_data'>
          <input type="text" value={getUserDOB} name='dob' onChange={(e) => { setUserDob(e.target.value) }} id='dob_input' placeholder='Your Date Of Birth' />
        </div>
        <div className="gender">
          <select value={getUserGender} onChange={(e) => { setUserGender(e.target.value) }} name='gender'>
            <option value="select">Select Gender</option>
            <option value="male">Male</option>
            <option value="femail">Femail</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="username" id='appoint_data'>
          <input type="text" value={getUserAptDate} name='appdate' id='appoint_input' onChange={(e) => setUserAptDate(e.target.value)} placeholder='Appointment Date' />
        </div>


        <div className="Pediactrics">
          <select value={getUserSelectDept} name='dep' onChange={(e) => setUserSelectDept(e.target.value)}>
            <option value="Ortho">Ortho</option>
            <option value="Neurology">Neurology</option>
            <option value="ENT">ENT</option>
            <option value="PhysicalTherapy">PhysicalTherapy</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Radiology">Radiology</option>
          </select>
        </div>
        <div className="doctor">
          <select name='doctorname' value={getUserSelectDoctor} onChange={(e) => setUserSelectDoctor(e.target.value)}>
            {
              getAllDoctorName.map((elem, index) => {
                return <option key={index} value={elem.name}>{elem.name} </option>
              })
            }
          </select>
        </div>
        <div className="address" id='address'>
          <textarea name="address" id="" rows={10} onChange={(e) => { setUserAdd(e.target.value) }} placeholder='Please Breifly explain about your health issue....'></textarea>
        </div>

        <div id="alread_visited">
         Already Visited ?  <input type="checkbox" onChange={(e)=>{setIsUserVisited(!e)}} name="isvisited" id="" />
        </div>

        <div id="book_appointment">
          <button>Book Appointment</button>
        </div>
      </form>
    </div>
  )
}

export default Appointment
