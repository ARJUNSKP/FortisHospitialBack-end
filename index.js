const express = require('express')
require('dotenv').config()
const server = express()
require('./connection/dbconnection')
const route=require('./routes/routing')
const cors=require('cors')
server.use(cors())


server.use(express.json())
server.use(route)

const port = 3001||process.env.port
server.listen(port,()=>{
    console.log(`server running ${port} in this port`);
})