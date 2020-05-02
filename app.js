// Import
let express = require('express')
var app = express()

const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger')

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


app.use('/swagger/index.html', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/tasks', taskRoutes)
app.use('/users', userRoutes)

app.use("/template",express.static(__dirname+'/template'))
app.use((req, res, next) => {
    res.status(404)
    res.sendFile(__dirname+ '/template/index.html')
})

app.use(handleError)


module.exports = app