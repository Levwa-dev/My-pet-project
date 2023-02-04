const express = require('express')
const router = new express.Router()

const orderController = require('../../../controllers/order-controller')

router.use(express.json())

router.post('/make-order', orderController.addOrder)


module.exports = router