const express  = require('express')
const router = express.Router()
const User = require('../model/user')

router.get('/',async (req,res,next)=>{
    res.status(200).json({
        message:'hh'
    })
})

router.get('/:id',async (req,res,next)=>{
    res.status(200).json({
        id:req.params.id
    })
})

router.post('/',async (req,res,next)=>{

})
router.put('/:id',async (req,res,next)=>{
    
})
router.delete('/:id',async (req,res)=>{
    
})


module.exports=router