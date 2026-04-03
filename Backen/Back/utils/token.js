const jwt = require('jsonwebtoken')


const generteKey = (username, useremail, userId) => {
  const createKey = jwt.sign({ username, useremail, userId }, process.env.MY_TOKEN)
  return createKey
}

const verifyUser = (req, res, next) => {
  if (!req.cookies["token"]) {
    return res.status(403).json({ message: "Login Again" });
  }
  jwt.verify(req.cookies["token"], process.env.MY_TOKEN, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Login Again " });
    req.user = decoded;
    next();
  });
}

module.exports = { generteKey, verifyUser }