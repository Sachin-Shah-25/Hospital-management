import React, { useContext, useEffect } from 'react'
import { Contex } from '../Cont/Contex'

function Dep({depDet}) {
    const {getDoctorsDetails,setDetails}=useContext(Contex)
     const getSelectDoctorDetails=(e)=>{
        const getDepName=e.target
        const trimText=depDet.label.substring(0,3)
        const getDctors_Detail=getDoctorsDetails.filter((elem)=> {
            if(elem.dep.startsWith(trimText)){
                return elem
            }
        })
        setDetails(getDctors_Detail[0])
      }
  return (
     <div  onClick={(e)=>getSelectDoctorDetails(e)} style={{
            color: "navy",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            opacity:0.2
          }}>
            <i className={depDet.icon} style={{
              display: 'block',
              fontSize: "5rem"
            }}></i>
            <span>{depDet.label}</span>
          </div>
  )
}

export default Dep
