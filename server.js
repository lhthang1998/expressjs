// Import express
require('dotenv').config()
const app = require('./app')

// Setup server port
var port = process.env.PORT

// Init connect database
const db =require('./src/api/db/db')
const http = require('http')

server = http.createServer(app)

server.listen(port,()=>console.log("Running on port "+port))