const express = require('express')
const router = new express.Router()

const AuthController = require('../../controllers/auth-controller')
const checkAuth = require('../../middlewares/auth/check-auth')
router.use(express.json())

router.post('/registration', AuthController.registration)
router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.get('/refresh', AuthController.refresh)



module.exports = router