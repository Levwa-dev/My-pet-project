const express = require('express')
const router = new express.Router()

const orderController = require('../../../controllers/order-controller')

router.use(express.json())

router.post('/add', orderController.addOrder)
router.put('/update/:id', orderController.updateOrder)
router.delete('/delete/:id', orderController.deleteOrder)
router.get('/list/:page', orderController.showOrderList)
router.get('/:id', orderController.showOrder)

module.exports = router