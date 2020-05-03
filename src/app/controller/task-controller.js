const Task = require('../model/task')
const User = require('../model/user')
const mongoose = require('mongoose')

exports.tasks_get_all = async (req, res, next) => {
    try {
        let tasks = await Task.find().populate('user', 'username')
        res.status(200).json({
            tasks: tasks
        })
    } catch (err) {
        next(err)
    }
}

exports.tasks_get_by_id = async (req, res, next) => {
    try {
        const id = req.params.id
        let task = await Task.findById(id).populate('user', 'username  email')
        if (!task) {
            res.status(404).json({
                error: "not found"
            })
        } else {
            res.status(200).json(task)

        }
    } catch (err) {
        next(err)
    }
}

exports.create_task = async (req, res, next) => {
    try {
        const task = new Task({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            user: req.body.userId,
        })
        let user = await User.findOne({ _id: task.user })
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
        next(err)
    }
}

exports.update_task = async (req, res, next) => {
    try {
        const id = req.params.id

        const isReturnNewDocs = { new: true, useFindAndModify: false }
        const updateOpts = new Task({
            title: req.body.title,
        })

        if (req.body.userId != undefined) {
            updateOpts.user = req.body.userId
            let user = await User.findOne({ _id: mongoose.Types.ObjectId(updateOpts.user) })
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
        }

        let task = await Task.findOneAndUpdate({ _id: id }, { $set: updateOpts }, isReturnNewDocs).populate('user', 'username')
        if (!task) {
            return res.status(404).json({
                error: "not found"
            })
        }
        res.status(200).json(task)
    } catch (err) {
        next(err)
    }
}

exports.delete_task = async (req, res) => {
    try {
        const id = req.params.id
        let task = await Task.findByIdAndDelete({ _id: id }).populate('user', 'username')
        if (!task) {
            return res.status(404).json({
                error: "not found"
            })
        }
        res.status(200).json(task)
    } catch (err) {
        next(err)
    }
}