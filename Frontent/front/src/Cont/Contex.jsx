import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const Contex = createContext();


export const ContextProvider = (props) => {
  const [get_IfUserLogin, set_IfUserLogin] = useState();
  const [getUserAccount, setUserAccount] = useState("");
  const [getDoctorsDetails,setDoctorDetails]=useState([])
  const [details,setDetails]=useState(null)


  const getUserFun = async () => {
    try {
      const data = await
        axios.get("http://localhost:5000/userid", {
          withCredentials: true
        })
      if (data.status != "200") {
        throw new Error("Something Went wrong")
      }
      set_IfUserLogin(data.data.data)

    } catch (error) {
      const status = error.response.status || 500
      const msg = error.response.data.message
      if (status == 403) {
        toast.error(msg)
      }
      else if (status == 401) {
        toast.error(msg)
      }

      else {
        toast.error("Something went wrong");
        console.log("An error Occured : ", error.message)
      }
    }
  }

  console.log("run ")





  
  const getAllDoctorsFun=async()=>{
    try {
      const res=await axios.get("http://localhost:5000/admin/doctors")
      if(res.status!=200){
        throw new Error("Something Went wrong")
      }
      const getData=res.data.data

      setDoctorDetails([...getData])

    } catch (error) {
      console.log("Error : ",error.message)
    }
  }


  useEffect(() => {
      getAllDoctorsFun()
      getUserFun()
  }, [])


  return <Contex.Provider value={{ getUserAccount, setUserAccount, get_IfUserLogin, set_IfUserLogin,getDoctorsDetails ,setDetails,details}} >
    {props.children}
  </Contex.Provider>
}