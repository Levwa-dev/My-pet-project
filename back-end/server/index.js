require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')
const cookie = require('cookie-parser')


const app = express()
const router = require('./router/index.js') // Підключення роутера застосунку
const port = process.env.PORT || 5000


app.use(cors({origin: process.env.CLIENT_HOST || 'http://localhost:3000', credentials:true})) // Надання клієнтській стороні доступу до сервера
app.use(cookie())
app.use(express.static(path.resolve(__dirname, 'public')))

app.use('/', router)

app.listen(port, ()=>{
    console.log(`App is running at ${port} port.`)
})
