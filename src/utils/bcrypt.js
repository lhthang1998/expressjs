module.exports.hashPwd = async (password) => {
    const saltRounds = 10;
    console.log(password)
    var hashedPassword = await bcrypt.hash(password, saltRounds, function (err, hash) {
        console.log("s")
        if (err){
            console.log(err)
        }
        
    });
    
    return hashedPassword
}