const express = require('express')
require('./db/mongoose.js')
const userRoute = require('./routes/user')
const taskRoute = require('./routes/tasks')
const bcrypt = require('bcrypt')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use(userRoute)

app.use(taskRoute)

app.listen(port,()=>{
    console.log('server is on ' + port)
})  

