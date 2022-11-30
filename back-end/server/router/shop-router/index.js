const express = require('express')
const router = new express.Router()

const authMiddleware = require('../../middlewares/auth/check-auth')

router.get('/', authMiddleware, (req, res)=>{
    res.send('work')
})


module.exports = router