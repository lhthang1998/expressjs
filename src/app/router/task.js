const express = require('express')
const router = express.Router()
const Task = require('../model/task')
const User = require('../model/user')
const mongoose = require('mongoose')

router.get('/', async (req, res, next) => {
    try {
        let tasks = await Task.find().populate('user', 'username')
        res.status(200).json({
            tasks: tasks
        })
    } catch (err) {
        return res.status(400).json(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id
        let task = await Task.findById(id).populate('user', 'username  password')
        if (!task) {
            res.status(404).json({
                error: "not found"
            })
        } else {
            res.status(200).json(task)

        }
    } catch (err) {
        return res.status(400).json(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const task = new Task({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            user: req.body.userId,
        })

        let user = await User.find({ _id: task.userId })
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        let create = await task.save()
        if (!create) {
            return res.status(400).json({
                error: "bad request"
            })
        }
        res.status(200).json(create)
    } catch (err) {
        return res.status(400).json(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const id = req.params.id

        const isReturnNewDocs = { new: true, useFindAndModify: false }
        const updateOpts = new Task({
            title: req.body.title
        })
        let task = await Task.findOneAndUpdate({ _id: id }, { $set: updateOpts }, isReturnNewDocs).populate('user', 'username')
        if (!task) {
            return res.status(404).json({
                error: "not found"
            })
        }
        res.status(200).json(task)
    } catch (err) {
        return res.status(500).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        let task = await Task.findByIdAndDelete({ _id: id }).populate('user', 'username')
        if (!task) {
            return res.status(404).json({
                error: "not found"
            })
        }
        res.status(200).json(result)
    } catch (err) {
        return res.status(500).json(err)
    }
})


module.exports = router