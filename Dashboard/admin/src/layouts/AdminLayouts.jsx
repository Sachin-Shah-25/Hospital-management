import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import '../App.css'
import { FaHome } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { MdSecurity } from "react-icons/md";
import { FaRegMessage } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { FiUserPlus } from "react-icons/fi";
import { toast } from 'react-toastify';
import { IoPersonAddSharp } from "react-icons/io5";
import { CountContext } from "../Cont/CountContext.jsx";
import axios from 'axios';
function AdminLayouts() {
    const getContext = useContext(CountContext);
    const [isViewAvai, setViewAvai] = useState(true);
    const [getIfView, setIfView] = useState({});
    const [getAppointment,setAppointments]=useState([]);

    const isEmptyObject = (obj) => {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    };


   
    useEffect(() => {
        const getResult = isEmptyObject(getContext.getView);
        if (!getResult) {
            setIfView(getContext.getView);
        }
        setViewAvai(getResult);
    }, [getContext.getView]);





    return (
        <div id='main_admin_container'>

            <div className="main_admin_box">
                <div className="admin_left_side">
                    <div className="react_icons">
                        <div className="home_icons">
                            <Link to={'/'} > <FaHome /></Link>
                        </div>
                        <div className="doctor_icons">
                            <Link to={'/admin/doctors'} > <FaUserDoctor /></Link>
                        </div>
                        {/* <div className="security_icons">
                            <MdSecurity />
                        </div> */}
                        <div className="add_icons">
                            <Link to={'/admin/adddoctor'}> <IoPersonAddSharp /></Link>
                        </div>
                        <div className="message_icons">
                            <FaRegMessage />
                        </div>
                        <div className="logout_icons">
                            <Link to={'/admin/login'} onClick={() => toast.success("Logout successfully !")}> <CiLogout /></Link>
                        </div>
                    </div>
                </div>
                <div className="admin_right_side">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    )
}

export default AdminLayouts
