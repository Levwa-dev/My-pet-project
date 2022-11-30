const express = require('express')
const router = new express.Router()

const categoryController = require('../../../controllers/category-controller')

router.use(express.json())

router.get('/list/:page', categoryController.showCategoryList)
router.get('/:id', categoryController.showCategory)
router.post('/add', categoryController.addCategory)
router.put('/:id', categoryController.updateCategory)
router.delete('/:id', categoryController.deleteCategory)

module.exports = router