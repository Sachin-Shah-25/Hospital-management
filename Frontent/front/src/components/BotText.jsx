function BotText({msg}){

    return<div style={{display:"flex",gap:"10px"}}>
        <h6 style={{
            width:"50%",
            color:"gray",
            textAlgin:"left",
             marginTop:"40px"
        }}>{msg.botAsk}</h6>
        <h6 style={{
            display:"block",
            width:"50%",
            textAlign:"right",
            color:"gray",
            marginTop:"20px"
        }}>{msg.userReply}</h6>
    </div>
}

export default BotText;