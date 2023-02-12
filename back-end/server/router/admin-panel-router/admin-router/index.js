const express = require('express')
const router = new express.Router()

const adminController = require("../../../controllers/user-controller")

router.use(express.json())

router.post('/add', adminController.addAdmin)
router.put('/:id', adminController.updateAdmin)
router.get('/list/:page', adminController.getAdminList)
router.get('/:id', adminController.getAdmin)
router.delete('/:id', adminController.deleteAdmin)

module.exports = router