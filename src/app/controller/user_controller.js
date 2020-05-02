const mongoose = require('mongoose')
const User = require('../model/user')
const utils = require('../../utils/bcrypt')
const jwt = require('../../utils/jwt')
const bcrypt = require('bcryptjs')
const constant = require('../../utils/roles')

exports.get_all_users = async (req, res, next) => {
    try {
        const neededRoles = [constant.ROLES.ADMIN]
        const {roles}= req.userData
        var contain = constant.checkArraysHas(roles,neededRoles)
        if (!contain){
            return res.status(403).json({
                error:"not have permission"
            })
        }
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.get_user_by_id = async (req, res, next) => {
    id = req.params.id
    try {
        const user = await User.findById(id).populate('user', 'username email')
        if (!user) {
            return res.status(404).json({
                error: "not found"
            })
        }
        res.status(200).json(user)
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.sign_up = async (req, res, next) => {
    try {
        console.log(constant.ROLES.length)
        const hashedPassword = await utils.hashPwd(req.body.password)
        const user = new User({
            _id: mongoose.Types.ObjectId(),
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            roles: [constant.ROLES.USER]
        })

        let create = await user.save()
        if (!create) {
            return res.status(400).json({
                error: err
            })
        }
        res.status(200).json(create)
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.login = async (req, res, next) => {
    try {
        let user = await User.findOne({ username: req.body.username })
        if (!user) {
            return res.status(404).json({
                error: "username not found"
            })
        }
        if (!await bcrypt.compare(req.body.password, user.password)) {
            return res.status(401).json({
                error: "unauthorized"
            })
        } else {
            const token = jwt.generateToken(user)
            res.status(200).json({
                message: "OK",
                token: token,
            })
        }
    } catch (err) {
        return res.status(500).json(err)
    }
}