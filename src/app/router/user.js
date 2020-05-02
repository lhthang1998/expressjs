const express = require('express')
const checkAuth =require('../middleware/auth')
const UserController = require('../controller/user_controller')

const router = express.Router()

router.get('/',checkAuth, UserController.get_all_users)

router.get('/:id',UserController.get_user_by_id)

router.post('/sign-up', UserController.sign_up)

router.post('/login', UserController.login)

module.exports = router