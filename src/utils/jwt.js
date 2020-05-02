const jwt = require('jsonwebtoken')

module.exports.generateToken = (user)=> {
    const token = jwt.sign({
        username: user.username,
        email: user.email,
        roles: user.roles,
    }, "my-secret-key", { expiresIn: "1h" })
    return token
}