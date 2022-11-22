const express = require('express')
const router = new express.Router()

router.use('/', (req, res)=>{
    res.send('work')
})


module.exports = router