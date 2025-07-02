import axios from 'axios';
import React, { useEffect, useState } from 'react'

import Appointment from '../components/Appointment';


function Dashboard() {
 
  const [getAllAppointments, setAllAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/admin/appointments");
      const response = data.message;
      setAllAppointments(response);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAppointments();
  }, []);
  return (
    <div>
      <div className="dash_header">
        <div className="header_first">
          <h1>Hello Sachin</h1>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus aspernatur nesciunt iure hic pariatur sunt error exercitationem? Voluptas, labore numquam.</p>
        </div>
        <div className="header_mid">
          <h1>Total Appointments</h1>
          <p>{getAllAppointments.length}</p>
        </div>
        <div className="header_last">
          <h1>Registred Doctors</h1>
          <p>10</p>
        </div>
      </div>
      <div className="dash_content">
        <h1>Appointments</h1>
        <table className="appt_details">
          <thead>
            <tr className="app_head">
              <td className="patient_name">
                <span>Patient</span>
              </td>
              <td className="patient_date">
                <span>Date</span>
              </td>
              <td className="patient_for_doc">
                <span>Doctor</span>
              </td>
              <td className="patient_dept">
                <span>Department</span>
              </td>
              <td className="patient_status">
                <span>Status</span>
              </td>
              <td className="patient_visited">
                <span>Visited</span>
              </td>

            </tr>
          </thead>

          <tbody>
            {
              getAllAppointments.map((appt, index) => {
                return <Appointment elem={appt} id={index}  ></Appointment>
              })
            }


          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dashboard;
