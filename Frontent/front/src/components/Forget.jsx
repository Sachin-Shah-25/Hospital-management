import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Forget({ setForgetBox, showForgetBox }) {
    console.log(showForgetBox)
    const getNavigate = useNavigate()

    const passwordChangeFun = (e) => {
        e.preventDefault()
        const loader = toast.loading("")
        setTimeout(async () => {
            toast.dismiss(loader)
            try {
                const formData = new FormData(e.target)
                const { email, confirmpassword, password } = Object.fromEntries(formData)
                if (!email || !confirmpassword || !password) {
                    toast.error("All Field are required")
                    return
                }
                if (confirmpassword != password) {
                    toast.error("Password Doen't Match")
                    return
                }
                const isPasswordChanges = await axios.post("http://localhost:5000/changep", formData, { withCrendentials: true })

                if (isPasswordChanges.status != 200) {
                    throw new Error("Something Went Wrong")
                }
                console.log(isPasswordChanges)
                const success = toast.success("Password has been Changed")
                setTimeout(() => {
                    toast.dismiss(success)
                    toast.success("Please Login Again ")
                }, 1000)
                setForgetBox(false)

            } catch (error) {
                console.log(error)
                const status = error.response.status
                if (status == 404) {
                    toast.error(error.response.data.message)
                }
                else {
                    toast.error("Something went wrong")
                    console.log("error : ", error.message)

                }
            }

        }, 2000)
    }
    return (
        <div style={{
            position: "absolute",
            top: "30%",
            left: "50%",
            width: "100%",
            transform: "translateX(-50%)",
            opacity: 1
        }}>
            <div id='forget_box' style={{
                margin: "auto",
                width: "30%",
                backgroundColor: "#559af3",
                borderRadius: "5px",
                borderColor: "gray"
            }} >
                <div style={{
                    float: "right",
                    padding: "10px 15px"
                }} >
                    <i onClick={() => setForgetBox(false)} className="fa-solid fa-xmark" style={{
                        display: "inline-block",
                        fontSize: "25px",
                        color: "white",
                        cursor: "pointer"
                    }}></i>
                </div>
                <form onSubmit={(e) => passwordChangeFun(e)} style={{
                    margin: "auto",
                    width: "100%",
                    padding: "20px 35px",
                    backgroundColor: "#559af3",
                    borderRadius: "5px",
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "0"
                }} >

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        color: "white",
                    }}>
                        <label htmlFor='Re_email'>Enter Your Email</label>
                        <input style={{
                            marginTop: "5px",
                            padding: '5px 0px',
                            borderRadius: "5px",
                            borderColor: "#559af3",
                            paddingLeft: "5px"
                        }} type="email" id='Re_email' name='email' />
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "15px",
                        color: "white"

                    }}>
                        <label htmlFor='Re_password'>Enter New Password</label>
                        <input style={{
                            marginTop: "5px",
                            padding: '5px 0px',
                            borderRadius: "5px",
                            borderColor: "#559af3",
                            paddingLeft: "5px"
                        }} type="text" id='Re_password' name='password' />
                    </div>

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: "15px",
                        color: "white"
                    }}>
                        <label htmlFor='Re_password1'>Confrim Password</label>
                        <input style={{
                            marginTop: "5px",
                            padding: '5px 0px',
                            borderRadius: "5px",
                            borderColor: "#559af3",
                            paddingLeft: "5px"
                        }} type="text" id='Re_password1' name='confirmpassword' />
                    </div>

                    <div style={{
                        marginTop: "35px"
                    }}>
                        <button style={{
                            fontWeight: "bold",
                            padding: "8px 12px",
                            width: "100%",
                            cursor: "pointer",
                            fontSize: "18px",
                            borderRadius: "5px",
                            borderColor: "white",

                        }} type="submit">Change Password</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Forget
