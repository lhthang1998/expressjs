const express = require('express')
const TaskController = require('../controller/task-controller')

const router = express.Router()

router.get('/', TaskController.tasks_get_all)

router.get('/:id', TaskController.tasks_get_by_id)

router.post('/', TaskController.create_task)

router.put('/:id', TaskController.update_task)

router.delete('/:id', TaskController.delete_task)


module.exports = router