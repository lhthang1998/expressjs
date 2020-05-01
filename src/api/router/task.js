const express  = require('express')
const router = express.Router()
const Task = require('../model/task')
const mongoose = require('mongoose')

router.get('/',(req,res,next)=>{
    Task.find().exec().then(docs=>{
        const resp ={
            total:docs.length,
            tasks:docs
        }
        res.status(200).json(resp)
    }).catch(err=>{
        res.status(500).json({
            error: err
        })
    })
})

router.get('/:id',(req,res,next)=>{
    const id = req.params.id
    Task.findById(id).exec().then(doc=>{
        if (doc){
            res.status(200).json(doc)
        }else{
            res.status(404).json({
                error: "Not found"
            })
        }
    }).catch(err=>{
        res.status(500).json({
            error: err
        })
    })
})

router.post('/',(req,res,next)=>{
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        title:req.body.title,
    })
    task.save().then(result=>{
        res.status(200).json({
            task : result
        })
    }).catch(err=>{
        res.status(500).json({
            error : err
        })
    })
})
router.put('/:id',(req,res,next)=>{
    const id = req.params.id

    const isReturnNewDocs = {new:true,useFindAndModify:false}
    const updateOpts = new Task({
        title:req.body.title
    })
    Task.findOneAndUpdate({_id:id},{$set :updateOpts},isReturnNewDocs)
        .exec().then(doc=>{
            res.status(200).json(doc)
        }).catch(err=>{
            res.status(500).json({
                error:err
            })
    })
})
router.delete('/:id',(req,res)=>{
    const id = req.params.id
    Task.findByIdAndDelete({_id:id}).exec().then(result=>{
        res.status(200).json(result)
    }).catch(err=>{
        res.status(500).json({
            error: err
        })
    })
})


module.exports=router