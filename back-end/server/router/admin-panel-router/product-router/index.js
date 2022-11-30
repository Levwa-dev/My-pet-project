const express = require('express')
const router = new express.Router()

const productController = require('../../../controllers/product-controller')
const {productUpload, productDetailUpload} = require('../../../multer-config/multer-config')


router.post('/add', productUpload.single('picture'), productController.addProduct)
router.put('/:id', productUpload.single('picture'), productController.updateProduct)
router.post('/upload-photos/:id', productDetailUpload.array('picture'), productController.uploadDetailPhotos)

router.use(express.json())

router.get('/list/:page', productController.showProductList)
router.get('/:id', productController.showProduct)
router.delete('/:id', productController.deleteProduct)


module.exports = router
