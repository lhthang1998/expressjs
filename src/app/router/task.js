const express = require('express')
const router = express.Router()
const Task = require('../model/task')
const User = require('../model/user')
const mongoose = require('mongoose')
const TaskController = require('../controller/task_controller')

router.get('/', TaskController.tasks_get_all)

router.get('/:id', TaskController.tasks_get_by_id)

router.post('/', TaskController.create_task)

router.put('/:id', TaskController.update_task)

router.delete('/:id', TaskController.delete_task)


module.exports = router