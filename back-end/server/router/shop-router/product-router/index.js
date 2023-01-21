const express = require('express')
const router = new express.Router()

const productController = require('../../../controllers/product-controller')


router.use(express.json())

router.get('/show-products-on-main', productController.showProductsOnMain)
router.get('/:id', productController.showProduct)


module.exports = router