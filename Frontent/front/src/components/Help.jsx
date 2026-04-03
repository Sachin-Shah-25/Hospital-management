import aiv from '../assets/img/p1.mp4'
import { useState, useRef } from 'react'
import axios from 'axios'
const VITE_BASE_URL =import.meta.env.VITE_BASE_URL

export const Help = () => {
    const [getText, setText] = useState("")
    const [getLoadingText, setLoadingText] = useState(false)
    const textRef = useRef(null)
    const handleFun = () => {
        setLoadingText(true)
        const timeOutId = setTimeout(async () => {

            if (getText.trim() === "") {
                textRef.current?.focus()
                setLoadingText(false)
                clearTimeout(timeOutId)
                return;
            }

            try {
                const { data } = await axios.post(`${VITE_BASE_URL}/chat`, { message: getText });
                if (data.success) {
                    setText(data.reply.content)

                }
            }
            catch (e) {
                console.log("coudn't process")
            }
            setLoadingText(false)
        }, 2000)
    }
    return <>
        <div className="help_container" style={{ marginTop: "100px" }}>
            <div className="top_section">
                <h2>Where should I consult ?</h2>

                <div className="text_cont1">
                    <div className="video_box">
                        <video
                            onClick={handleFun}
                            src={aiv}
                            autoPlay
                            muted
                            loop
                            className="video"
                        />
                    </div>
                </div>
            </div>

            <div className="textarea_wrapper">
                <textarea
                    ref={textRef}
                    value={getText}
                    onChange={(e) => setText(e.target.value)}
                    rows={10}
                    className="textarea"
                    placeholder={"Briefly describe your problem (symptoms, duration, etc.)"}
                />

                {
                    getLoadingText
                        ? <div className="overlay">
                            <div style={{ width: "50px", height: "50px" }}>

                                <video src={aiv} autoPlay muted loop className="text_cont2">
                                </video>
                            </div>
                        </div>
                        : ""
                }

            </div>
        </div>
    </>
}