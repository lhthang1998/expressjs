const jwt = require('jsonwebtoken')

module.exports = (req,res)=>{
    try{
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token,"my-secret-key")
        req.userData = decoded
        return null
    }catch(err){
        return err
    }
}