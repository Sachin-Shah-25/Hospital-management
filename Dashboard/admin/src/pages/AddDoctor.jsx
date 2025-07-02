import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

function AddDoctor() {
  const [getdoctorfirstname, setdoctorfirstname] = useState("");
  const [getdoctorlastname, setdoctorlastname] = useState("");
  const [getdoctoremail, setdoctoremail] = useState("");
  const [getdoctorphone, setdoctorphone] = useState("");
  const [getdoctornic, setdoctornic] = useState("");
  const [getdoctordob, setdoctordob] = useState("");
  const [getdoctordep, setdoctordep] = useState("");
  const [getdoctorimage, setdoctorimage] = useState(null);

  const adddoctorfun = (e) => {
    e.preventDefault();
    if (!getdoctorfirstname || !getdoctorlastname || !getdoctoremail || !getdoctorphone ||
      !getdoctornic || !getdoctordob || !getdoctordep || !getdoctorimage) {
      toast.error("All Filed Rquired");
    }
    else {
      if (!getdoctorimage) {
        toast.error("Image Not Found");
      }
      else {
        const newData=new FormData(e.target);
        axios.post("http://localhost:5000/admin/adddoctor",newData).then(({data}) => {
         if(data.success){
          toast.success("Updated");
         }
        }).catch((e) => {
          console.log(e.message);
        })
      }


    }
  }


  return (
    <div id='add_doc_container'>
      <div className="my_logo">
        <img src="/img/doc4.png" alt="" />
      </div>
      <div className="add_head">
        <p>Register a new doctor</p>
      </div>
      <div className="add_doc_form">
        <form action="#" onSubmit={(e) => { adddoctorfun(e) }} encType='multipart/form-data' >
          <div className="form_left_side">
            <div className="doc_upload_img">
              <img src="/img/doc1.png" alt="" />
            </div>
            <div className="upload_input">
              <input type="file" onChange={(e) => setdoctorimage(e.target.files)} name="image" placeholder='' accept='image/*' id="" />
            </div>
          </div>
          <div className="form_right_side">
            <div className="doc_first_name">
              <input type="text" onChange={(e) => setdoctorfirstname(e.target.value)} placeholder='First Name' name="firstname" id="" />
            </div>
            <div className="doc_last">
              <input type="text" onChange={(e) => setdoctorlastname(e.target.value)} placeholder='Last Name' name="lastname" id="" />
            </div>
            <div className="doc_email">
              <input type="email" onChange={(e) => setdoctoremail(e.target.value)} placeholder='Enter Your Email' name="email" id="" />
            </div>
            <div className="doc_phone">
              <input type="text" onChange={(e) => setdoctorphone(e.target.value)} placeholder='Phone Number' name="phone" id="" />
            </div>
            <div className="doc_nic">
              <input type="text" onChange={(e) => setdoctornic(e.target.value)} placeholder='NIC' name="nic" id="" />
            </div>
            <div className="doc_dob">
              <input type="date" onChange={(e) => setdoctordob(e.target.value)} name="dob" id="" />
            </div>

            <div className="doc_dep">
              <select name="dep" onChange={(e) => setdoctordep(e.target.value)} id="">
              <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Oncology">Oncology</option>
            <option value="Radiology">Radiology</option>
            <option value="PhysicalTherapy">PhysicalTherapy</option>
            <option value="Ortho">Ortho</option>
            <option value="ENT">ENT</option>
              </select>
            </div>

            <div className="upload_doc_data">
              <button>Register New Doctor</button>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}

export default AddDoctor;
