const express  = require('express')
const router = express.Router()
const User = require('../model/user')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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

router.post('/sign-up',async (req,res,next)=>{
    try{
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(req.body.password, 10, function(err, hash) {
              if (err) reject(err)
              resolve(hash)
            });
          })
        const user = new User({
            _id: mongoose.Types.ObjectId(),
            username: req.body.username,
            password: hashedPassword,
        })
    
        let create = await user.save()
        if (!create){
            return res.status(400).json({
                error:err
            }) 
        }
        res.status(200).json(create)
    }catch(err){
        res.status(500).json(err) 
    }
})

router.post('/login',async (req,res,next)=>{

})

router.post('/',async (req,res,next)=>{

})
router.put('/:id',async (req,res,next)=>{
    
})
router.delete('/:id',async (req,res)=>{
    
})


module.exports=router