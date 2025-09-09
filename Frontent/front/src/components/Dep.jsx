import React, { useContext, useEffect } from 'react'
import { Contex } from '../Cont/Contex'

function Dep({depDet}) {
    const {getDoctorsDetails,setDetails}=useContext(Contex)
    // console.log(getDoctorsDetails)
     const getSelectDoctorDetails=(e)=>{
        const getDepName=e.target
        const trimText=depDet.label.substring(0,3)
        console.log(trimText)
        const getDctors_Detail=getDoctorsDetails.filter((elem)=> {
            console.log(elem.dep, " ",trimText)
            if(elem.dep.startsWith(trimText)){
                return elem
            }
        })
        setDetails(getDctors_Detail[0])
        console.log(getDctors_Detail)
      }
  return (
     <div  onClick={(e)=>getSelectDoctorDetails(e)} style={{
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center"
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
