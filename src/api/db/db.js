var mongoose = require('mongoose')

const mongoURI = process.env.MONGO
const dbName = process.env.DB_NAME

const conn = mongoose.connect(mongoURI,(err)=>{
    if (err){
        console.log("Error "+err)
    }else{
        console.log("Fail to connect database")
    }
})

module.exports=conn