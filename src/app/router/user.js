const express = require('express')
const checkAuth =require('../middleware/authorization')
const UserController = require('../controller/user-controller')
const constant = require('../../utils/roles')

const router = express.Router()
/**
 * @swagger
 *
 * definitions:
 *   user:
 *     type: object
 *     required:
 *       - title
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 *       id:
 *         type: string
 */

 /**
 * @swagger
 * /users:
 *   get:
 *     description: Get all users
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/user'
 */
router.get('/',checkAuth([constant.ROLES.ADMIN,constant.ROLES.USER]), UserController.get_all_users)

router.get('/:id',UserController.get_user_by_id)

router.post('/sign-up', UserController.sign_up)

router.post('/login', UserController.login)

module.exports = router