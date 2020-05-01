// Import
let express = require('express')
let app = express()

const morgan = require('morgan')
const taskRoutes = require('./src/api/router/task')
const userRoutes = require('./src/api/router/user')
const bodyParser = require('body-parser')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method=='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, GET, DELETE')
        return res.status(200).json({})
    }
    next()
})

app.use('/tasks',taskRoutes)
app.use('/users',userRoutes)


module.exports=app