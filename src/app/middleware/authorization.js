const jwt = require('jsonwebtoken')
const checkAuth = require('./authentication')
const constant = require('../../utils/roles')

module.exports = function authorization(neededRoles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof neededRoles === 'string') {
        neededRoles = [neededRoles];
    }
    return [
        // authorize based on user role
        (req, res, next) => {
            var err = checkAuth(req,res,next)
            if (err!=null){
                return res.status(401).json(err)
            }
            const { roles } = req.userData
            var contain = constant.checkArraysHas(roles, neededRoles)
            if (!contain) {
                return res.status(403).json({
                    error: "not have permission"
                })
            }
            console.log(contain)
            // authentication and authorization successful
            next();
        }
    ];
}