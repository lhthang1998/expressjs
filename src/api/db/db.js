var mongoose = require('mongoose')

const mongoURI = process.env.MONGO_HOST
const dbName = process.env.DB_NAME

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: dbName,
}
const conn = mongoose.connect(mongoURI, mongoOptions, (err) => {
    console.log(mongoURI)
    if (err) {
        console.log("Error " + err)
    }
})

module.exports = conn