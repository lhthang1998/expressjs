// Import
let express = require('express')
let app = express()

const taskRoutes = require('./src/api/router/task')
app.use('/tasks',taskRoutes)
app.use('/users',taskRoutes)
module.exports=app