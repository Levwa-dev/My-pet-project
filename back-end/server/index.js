require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')
const cookie = require('cookie-parser')


const app = express()
const router = require('./router/index.js')
const port = process.env.PORT || 5001


app.use(cors({origin: process.env.CLIENT_HOST, credentials:true}))
app.use(cookie())
app.use(express.static(path.resolve(__dirname, 'public')))

app.use('/', router)

app.listen(port, ()=>{
    console.log(`App is running at ${port} port.`)
})
