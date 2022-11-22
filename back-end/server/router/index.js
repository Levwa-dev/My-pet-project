const express = require('express')
const router = new express.Router()

const adminRouter = require('./adminPanelRouter/index')

router.use('/admin', adminRouter)

module.exports = router

