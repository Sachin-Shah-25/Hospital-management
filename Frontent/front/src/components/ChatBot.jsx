import React, { useState ,useRef} from "react";
import { BsChatDots } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import axios from 'axios'
import BotText from '../components/BotText'
import { Dialog } from '../components/Dialog'
const VITE_BASE_URL =import.meta.env.VITE_BASE_URL
const ChatBot = () => {
    const [getInput, setInput] = useState("")
    const [open, setOpen] = useState(false)
    const scorllRef=useRef(null)
    const [getUserDetails, setUserDetails] = useState(null)
    const [getUseState, setUserState] = useState([{
        botAsk: "Before going further can you tell you name ?",
        userReply: null

    }])

    const sendMessage = async () => {
      
        try {
            const { data } = await axios.post(`${VITE_BASE_URL}/usercred`, { det: getInput })
            if (!data.success) {
                console.log("Coun't processs")
                return;
            }
            if (data.confirmBooking) {
                setUserDetails(data.details)
                return
            }
            setUserState(prev => {
                return [...prev, { botAsk: data.next, userReply: data.rep }]
            })
            scorllRef.current?.scrollIntoView()
        } catch (e) {
            console.log(e.message)
        }
        setInput("")    
    }
    const BookAppop = async() => {
        setTimeout(()=>{
            alert("Your booking has confrimed ")
            window.location.reload()
        },1000)

    }
    return (
        <div className="chat_bot_container">
            {open
                ? <div className="chat_bot_area">
                    <div className="chat_header">ChatBot 🤖</div>

                    <div className="chat_body" ref={scorllRef}>
                        {getUseState.map((msg, i) => (
                            <BotText msg={msg} key={msg.botAsk} ></BotText>
                        ))}

                        {getUserDetails ? <div style={{ marginTop: "20px" }}>
                            <ul>
                                <li style={{ display: "flex", gap: "5px", color: "gray" }}><h6>Name :- </h6><h6>{getUserDetails.data.name}</h6> </li>

                                <li style={{ display: "flex", gap: "5px", color: "gray" }}><h6>Age :- </h6><h6>{getUserDetails.data.age}</h6> </li>

                                <li style={{ display: "flex", gender: "5px", color: "gray" }}><h6>Gender :- </h6><h6>{getUserDetails.data.name}</h6> </li>

                                <li style={{ display: "flex", gap: "5px", color: "gray" }}><h6>Email :- </h6><h6>{getUserDetails.data.email}</h6> </li>

                                <li style={{ display: "flex", gap: "5px", color: "gray" }}><h6>Number :- </h6><h6>{getUserDetails.data.number}</h6> </li>

                                <li style={{ display: "flex", gap: "5px", color: "gray" }}><h6>Department :- </h6><h6>{getUserDetails.data.dep}</h6> </li>

                            </ul>
                        </div> : ""}

                        {getUserDetails ?
                            <div  style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
                                <button onClick={BookAppop} style={{ border: "2px solid blue", padding: "2px 7px", color: "blue", backgroundColor: "white", borderRadius: "20px", cursor: "pointer" }}>Confirm Appointment</button>
                                <button style={{ border: "2px solid blue", padding: "2px 7px", color: "blue", backgroundColor: "white", borderRadius: "20px" }}>Cancel</button>
                            </div>
                            : ""
                        }

                    </div>

                    <div className="chat_input_area">
                        <input
                            value={getInput}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>
                : ""

            }


            <div className="chat_bot_button">
                <div
                    className="chat_bot_btn" style={{
                        background: open ? "red" : "#4f46e5"
                    }}
                    onClick={() => setOpen(!open)}
                >
                    {open ? <IoMdClose /> : <BsChatDots />}
                </div>
            </div>
        </div>
    );
};

export default ChatBot;