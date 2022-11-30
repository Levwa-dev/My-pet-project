const express = require('express')
const router = new express.Router()

const adminRouter = require('./admin-panel-router/index')
const shopRouter = require('./shop-router/index')
const authRouter = require('./auth-router/index')

router.use('/auth', authRouter)
router.use('/admin', adminRouter)
router.use('/shop', shopRouter)

module.exports = router

