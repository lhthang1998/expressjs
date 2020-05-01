const express  = require('express')
const router = express.Router()
const Task = require('../model/task')

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'hh'
    })
})

router.get('/:id',(req,res,next)=>{
    res.status(200).json({
        id:req.params.id
    })
})

router.post('/',(req,res,next)=>{
    
})
router.put('/:id',(req,res,next)=>{
    
})
router.delete('/:id',(req,res)=>{
    
})


module.exports=router