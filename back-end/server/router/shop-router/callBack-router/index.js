const express = require('express')
const router = new express.Router()

const callBackController = require('../../../controllers/callback-controller')

router.use(express.json())

router.post('/add', callBackController.addCallBack)

module.exports = router