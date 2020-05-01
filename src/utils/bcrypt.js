const bcrypt = require('bcryptjs')

module.exports.hashPwd = async (password)=> {
    const saltRounds = 10;
    console.log(password)
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })
    console.log(hashedPassword)
    return hashedPassword
}