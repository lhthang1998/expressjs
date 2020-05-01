const express  = require('express')
const router = express.Router()
const Task = require('../model/task')
const User = require('../model/user')
const mongoose = require('mongoose')

router.get('/',async (req,res,next)=>{
    let tasks =await Task.find()
    res.status(200).json({
        tasks:tasks
    }) 
})

router.get('/:id',async (req,res,next)=>{
    const id = req.params.id
    let task =await Task.findById(id)
    if (!task){
        res.status(404).json({
            error: "not found"
        })
    }else{
        res.status(200).json(doc) 
  
    }
})

router.post('/',async (req,res,next)=>{
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        title:req.body.title,
        userId:req.body.userId,
    })
    
    let user = await User.findById({_id:task.userId})
    if (!user){
        return res.status(404).json({
            message: 'User not found'
        });
    }
    let create = await task.save()
    if (!create){
        return res.status(400).json({
            error:"bad request"
        })
    }
    res.status(200).json(create)
})

router.put('/:id',async (req,res,next)=>{
    const id = req.params.id

    const isReturnNewDocs = {new:true,useFindAndModify:false}
    const updateOpts = new Task({
        title:req.body.title
    })
    let task = await Task.findOneAndUpdate({_id:id},{$set :updateOpts},isReturnNewDocs)
    if (!task){
        return res.status(404).json({
            error:"not found"
        })
    }
    res.status(200).json(task)
})

router.delete('/:id',async (req,res)=>{
    const id = req.params.id
    let task = await Task.findByIdAndDelete({_id:id})
    if (!task){
        return res.status(404).json({
            error:"not found"
        })
    }
    res.status(200).json(result)
})


module.exports=router