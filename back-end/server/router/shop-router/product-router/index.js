const express = require('express')
const router = new express.Router()

const productController = require('../../../controllers/product-controller')


router.use(express.json())

router.get('/increase', productController.increaseRating)
router.get('/show-products-on-main', productController.showProductsOnMain)


module.exports = router