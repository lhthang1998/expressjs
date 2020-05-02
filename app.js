// Import
let express = require('express')
let app = express()

const morgan = require('morgan')
const taskRoutes = require('./src/app/router/task')
const userRoutes = require('./src/app/router/user')
const bodyParser = require('body-parser')
const handleError =require('./src/app/middleware/error-handle')

// Init connect database
const db = require('./src/app/db/db')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, GET, DELETE')
        return res.status(200).json({})
    }
    next()
})


app.use('/tasks', taskRoutes)
app.use('/users', userRoutes)

app.use(express.static(__dirname+'/public'))
app.use((req, res, next) => {
    res.status(404)
    res.sendFile(__dirname+'/public/index.html')
})

app.use(handleError)


module.exports = app