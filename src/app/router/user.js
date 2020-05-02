const express = require('express')
const checkAuth =require('../middleware/authorization')
const UserController = require('../controller/user-controller')
const constant = require('../../utils/roles')

const router = express.Router()

router.get('/',checkAuth([constant.ROLES.ADMIN,constant.ROLES.USER]), UserController.get_all_users)

router.get('/:id',UserController.get_user_by_id)

router.post('/sign-up', UserController.sign_up)

router.post('/login', UserController.login)

module.exports = router