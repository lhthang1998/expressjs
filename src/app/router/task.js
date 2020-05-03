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
  *   newTask:
 *     type: object
 *     required:
 *       - title
 *     properties:
 *       title:
 *         type: string
 *       userId:
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

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     description: Get task by id
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: id
 *         description: task id
 *         in:  path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: task
 *         schema:
 *           items:
 *             $ref: '#/definitions/task'
 */
router.get('/:id', TaskController.tasks_get_by_id)

/**
 * @swagger
 * /tasks:
 *   post:
 *     description: Create task
 *     produces:
 *      - application/json
 *     requestBody:
 *        description: new task
 *        required: true
 *        content:
 *         application/json:
 *           schema:
 *            $ref: '#/definitions/newTask'
 *     responses:
 *       200:
 *         description: task
 *         schema:
 *           items:
 *             $ref: '#/definitions/task'
 */
router.post('/', TaskController.create_task)

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     description: Update task
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: id
 *         description: task id
 *         in:  path
 *         required: true
 *         type: string
 *     requestBody:
 *        description: task
 *        required: true
 *        content:
 *         application/json:
 *           schema:
 *            $ref: '#/definitions/newTask'
 *     responses:
 *       200:
 *         description: task
 *         schema:
 *           items:
 *             $ref: '#/definitions/task'
 */
router.put('/:id', TaskController.update_task)

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     description: Delete task by id
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: id
 *         description: task id
 *         in:  path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: task
 *         schema:
 *           items:
 *             $ref: '#/definitions/task'
 */
router.delete('/:id', TaskController.delete_task)


module.exports = router