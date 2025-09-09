const jwt=require('jsonwebtoken')


const generteKey=(username,useremail,userId)=>{
const createKey=jwt.sign({username,useremail,userId},process.env.JWT_SECRET)
console.log("Key ",createKey)
return createKey
}

const verifyUser=(req,res,next)=>{
    if(!req.cookies['token_key']){
       return res.status(403).json({ message: "Login Again" });
    }
    console.log("token ")
     jwt.verify(req.cookies['token_key'], process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Login Again " });
    req.user = decoded; 
    console.log("decoded ",decoded)
    next();
  });
}

module.exports= {generteKey,verifyUser}