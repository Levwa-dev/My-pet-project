const express = require('express')
const router = new express.Router()

const categoryController = require('../../../controllers/category-controller')


router.use(express.json())


module.exports = router