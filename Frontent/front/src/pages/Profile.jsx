import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import Loader from "./Loader";
const VITE_BASE_URL=import.meta.env.VITE_BASE_URL
const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${VITE_BASE_URL}/user/myapp`,{ withCredentials: true,}); 
      setUser(res.data.det);
      setAppointments(res.data.booked);
    } catch (err) {
      if(err.response?.status==403){
        console.log("login Again")
      }
    } finally {
      setLoading(false);
    }
  };
  

  const cancelFun = async(id)=> {
    try {
        const res = await axios.get(`${VITE_BASE_URL}/user/cancelapp/${id}`, { withCredentials: true, });

       window.location.reload()
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
}

  if (loading) return <Loader/>

  return (
    <div className="profile-wrapper">

      <div className="profile-card">
        <div className="avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <p>{user?.phone}</p>
        </div>
      </div>

      <div className="appointments">
        <h3>Appointment History</h3>
        {appointments.length === 0 ? (
          <p className="no-app">Koi appointment nahi mili abhi tak.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Doctor</th>
                <th>Department</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((app, index) => (
                <tr key={index}>
                  <td>{app.doctorname}</td>
                  <td>{app.dep}</td>
                  <td>{app.appdate}</td>
                  <td>{app.time}</td>
                  <td>
                    <span style={{cursor:"pointer",textDecoration:"underline",color:"red"}} onClick={()=>cancelFun(app._id)} className={`badge`}>
                     Cancel
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </div>
  );
};

export default UserProfile;