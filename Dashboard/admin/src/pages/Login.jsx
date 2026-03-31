import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import ErrorFallback from '../Components/ErrorFallback'
import Cookies from 'js-cookie'
import useUser from '../components/useUser'
import {useQueryClient} from '@tanstack/react-query'

async function authFun(userDetail) {
    try {
        console.log(Object.fromEntries(userDetail))
        const data = await axios.post(import.meta.env.VITE_LOGIN_URL, userDetail, {
            withCredentials: true
        });
        if (!data.data?.user) {
            throw new Error("Not user Found ")
        }
        return data.data.user

    } catch (e) {
        console.log("Error : ", e.message)
        throw e
    }

}
function Login() {
    const {isError,error,data,isLoading}=useUser()
     const queryClient = useQueryClient();

    const [getAdminEmail, setAdminEmail] = useState("");
    const [getAdminPass1, setAdminPass1] = useState("");
    const [getAdminPass2, setAdminPass2] = useState("");
    const navigate = useNavigate("")

    const adminloginfun = (e) => {
        e.preventDefault();

        if (!getAdminEmail || !getAdminPass1 || !getAdminPass2) {
            toast.error("All Field Are Required ");
        }
        else {
            if (getAdminPass1.trim() === getAdminPass2.trim()) {
                const admin_data = new FormData();
                admin_data.append("adminemail", getAdminEmail);
                admin_data.append("adminpassword", getAdminPass1);
                authFun(admin_data).then((data) => navigate("/"))
                    .catch(e => console.log(e.message))
                toast.success("Login Successfully ");
            }
            else {
                toast.error("Password not matched !");
            }
        }
    }
    useEffect(() => {
        console.log(data)
       if (!isLoading && !isError && data) {
        navigate("/");
    }
    else {
        queryClient.removeQueries["login"]
    }
       
    }, [isError,error,data,isLoading])

    return (
        <div id='login_container'>
            <div className="login_form">
                <div className="my_logo_image">
                    <img src="/img/doc4.png" alt="" />
                </div>
                <form action="#" onSubmit={(e) => adminloginfun(e)}>
                    <div className="admin_email">
                        <input type="email" value={getAdminEmail} onChange={(e) => setAdminEmail(e.target.value)} placeholder='Your Admin Email' name="" id="" />
                    </div>
                    <div className="admin_pass1">
                        <input type="text" value={getAdminPass1} placeholder='Password' onChange={(e) => setAdminPass1(e.target.value)} name="" id="" />
                    </div>
                    <div className="admin_pass2">
                        <input type="text" value={getAdminPass2} placeholder='Confirm Password' onChange={(e) => setAdminPass2(e.target.value)} name="" id="" />
                    </div>
                    <div className="login_admin">
                        <button>I Am Admin</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
