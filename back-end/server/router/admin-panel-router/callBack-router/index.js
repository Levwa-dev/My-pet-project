const express = require('express')
const router = new express.Router()

const callbackController = require("../../../controllers/callback-controller")

router.use(express.json())

router.post('/add', callbackController.addCallBack)
router.put('/:id', callbackController.updateCallBack)
router.delete('/:id', callbackController.deleteCallBack)
router.get('/list/:page', callbackController.showCallBackList)
router.get('/:id', callbackController.showCallBack)


module.exports = router