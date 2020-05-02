const express = require('express')
const TaskController = require('../controller/task-controller')

const router = express.Router()
/**
 * @swagger
 *
 * definitions:
 *   task:
 *     type: object
 *     required:
 *       - title
 *     properties:
 *       title:
 *         type: string
 *       id:
 *         type: string
 */

/**
 * @swagger
 * /tasks:
 *   get:
 *     description: Get all tasks
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: tasks
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/task'
 */
router.get('/', TaskController.tasks_get_all)

router.get('/:id', TaskController.tasks_get_by_id)

router.post('/', TaskController.create_task)

router.put('/:id', TaskController.update_task)

router.delete('/:id', TaskController.delete_task)


module.exports = router