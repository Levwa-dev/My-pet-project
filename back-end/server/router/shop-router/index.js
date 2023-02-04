const express = require('express')
const router = new express.Router()

const productRouter = require('./product-router/index')
const categoryRouter = require('./category-router/index')
const orderRouter = require('./order-router/index')

router.use('/product', productRouter)
router.use('/category', categoryRouter)
router.use('/order', orderRouter)

module.exports = router