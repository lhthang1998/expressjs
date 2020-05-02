const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token,"my-secret-key")
        req.userData = decoded
    }catch(err){
        return res.status(401).json({
            message: "unauthorized"
        })
    }
    next()
}