import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

function Doctors() {
  const [getAllDoctors, setAllDoctors] = useState([]);
  const myDoctors = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/admin/doctors");
      const response = data.message;
      setAllDoctors(response);
    } catch (error) {
      toast.error(error.message);
    }
  }
  useEffect(() => {

    myDoctors();
  }, []);

  return (
    <div id='doctor_container'>
      <h1>Doctors</h1>
      <div className="all_doctors">
        {
          getAllDoctors.map((elem, index) => {
            return <div className="card">
              <div className="doctor_image">
                <img src={"http://localhost:5000/img/"+elem.image} alt="" />
              </div>
              <div className="doctor_name">
                <p>{elem.name}</p>
              </div>
              <div className="doctor_email">
                <p>Email : </p> <span>{elem.email}</span>
              </div>
              <div className="doctor_phone">
                <p>Phone : </p> <span>{elem.phone}</span>
              </div>
              <div className="doctor_dob">
                <p>DOB : </p> <span>{elem.dob}</span>
              </div>
              <div className="doctor_dep">
                <p>Department : </p> <span>{elem.dep}</span>
              </div>
              <div className="doctor_nic">
                <p>NIC : </p> <span>{elem.nic}</span>
              </div>
            
            </div>
          })
        }


      </div>
    </div>
  )
}

export default Doctors
