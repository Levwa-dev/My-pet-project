const express = require('express')
const router = new express.Router()

const authMiddleware = require('../../middlewares/auth/check-auth')
const isAdmin = require('../../middlewares/auth/check-is-admin')

const categoryRouter = require('./category-router/index')
const productRouter = require('./product-router/index')
const orderRouter = require('./order-router/index')
const callBackRouter = require('./callBack-router/index')
const adminRouter = require('./admin-router/index')

router.use(authMiddleware)
router.use(isAdmin)

router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/order', orderRouter)
router.use('/callback', callBackRouter)
router.use('/admin', adminRouter)


module.exports = router