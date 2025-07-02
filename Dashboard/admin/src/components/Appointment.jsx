import React, {useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { CountContext } from '../Cont/CountContext';
function Appointment({elem}) {
  const getContext=useContext(CountContext);
  const [get_opp_status, set_opp_status] = useState("");

  const viewchangefun=()=>{
    
    getContext.setView(elem);
  }
  return (
    <tr>
    <td>{elem.firstname + " " + elem.lastname}</td>
    <td>{elem.dob}</td>
    <td>{elem.doctorname}</td>
    <td>{elem.dep}</td>
    <td><select value={get_opp_status} onChange={(e) => { set_opp_status(e.target.value); toast.success("Status Updated !") }}>
      <option value="accepted">Accepted</option>
      <option value="rejected">Rejected</option>
      <option value="pending">Pending</option>
    </select>
    </td>
    <td style={{ color: elem.isvisited === "on" ? "green" : "red" ,fontWeight:'500'}} >{elem.isvisited === "on" ? "Yes" : "No"}</td>
    <td> <span onClick={()=> viewchangefun()} style={{cursor:'pointer',textDecoration:'underline',textDecorationColor:'black'}} ><FaEye /></span> </td>
  </tr>
  )
}

export default Appointment;
