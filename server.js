// Import express
require('dotenv').config()
const app = require('./app')

// Setup server port
var port = process.env.PORT

const http = require('http')

server = http.createServer(app)

server.listen(port, () => console.log("Running on port " + port))