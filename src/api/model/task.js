const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        ref: 'user'
    }
},{collection: 'task',versionKey:false})

module.exports=mongoose.model('task',taskSchema)