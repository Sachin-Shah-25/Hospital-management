import React, { useState } from 'react'

import { toast } from 'react-toastify';

function Login() {
    const [getAdminEmail, setAdminEmail] = useState("");
    const [getAdminPass1, setAdminPass1] = useState("");
    const [getAdminPass2, setAdminPass2] = useState("");

    const adminloginfun = (e) => {
        e.preventDefault();

        if(!getAdminEmail || !getAdminPass1 || !getAdminPass2){
            toast.error("All Field Are Required ");
        }
        else {
            if (getAdminPass1.trim() === getAdminPass2.trim()) {
                const admin_data = new FormData();
                admin_data.append("adminemail", getAdminEmail);
                admin_data.append("adminpassword", getAdminPass1);
                toast.success("Login Successfully ");
                setAdminPass1("");
                setAdminPass2("");
                setAdminEmail("");
            }
            else {
                toast.error("Password not matched !");
            }
        }
    }

    return (
        <div id='login_container'>
            <div className="login_form">
                <div className="my_logo_image">
                    <img src="/img/doc4.png" alt="" />
                </div>
                <form action="#" onSubmit={(e) => adminloginfun(e)}>
                    <div className="admin_email">
                        <input type="email" value={getAdminEmail} onChange={(e)=> setAdminEmail(e.target.value)} placeholder='Your Admin Email' name="" id="" />
                    </div>
                    <div className="admin_pass1">
                        <input type="text" value={getAdminPass1} placeholder='Password' onChange={(e)=> setAdminPass1(e.target.value)} name="" id="" />
                    </div>
                    <div className="admin_pass2">
                        <input type="text" value={getAdminPass2} placeholder='Confirm Password' onChange={(e)=> setAdminPass2(e.target.value)} name="" id="" />
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
