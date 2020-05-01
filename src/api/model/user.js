const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
},{collection:'user',versionKey:false})

module.exports=mongoose.model('user',userSchema)