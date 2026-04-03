import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
const VITE_BASE_URL=import.meta.env.VITE_BASE_URL

export const Contex = createContext();


export const ContextProvider = (props) => {
  const [get_IfUserLogin, set_IfUserLogin] = useState();
  const [getUserAccount, setUserAccount] = useState("");
  const [getDoctorsDetails,setDoctorDetails]=useState([])
  const [details,setDetails]=useState(null)

  
  const getAllDoctorsFun=async()=>{
    try {
      const res=await axios.get(`${VITE_BASE_URL}/admin/doctors`)
      if(res.status!=200){
        throw new Error("Something Went wrong")
      }
      const getData=res.data.data

      setDoctorDetails(getData.map((item,index)=>{
        return {...item,exp:index+1}
      }))

    } catch (error) {
      console.log("Error : ",error.message)
    }
  }


  return <Contex.Provider value={{ getUserAccount, setUserAccount, get_IfUserLogin, set_IfUserLogin,getDoctorsDetails ,setDetails,details,getAllDoctorsFun}} >
    {props.children}
  </Contex.Provider>
}