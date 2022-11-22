const express = require('express')
const router = new express.Router()

const AdminController = require('../../controllers/adminController')

router.use(express.json())

router.post('/registration', AdminController.registration)
router.post('/login', AdminController.login)
router.post('/logout', AdminController.logout)
router.get('/refresh', AdminController.refresh)



module.exports = router