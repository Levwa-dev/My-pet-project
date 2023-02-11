const express = require('express')
const router = new express.Router()

const callbackController = require("../../../controllers/callback-controller")

router.use(express.json())

router.delete('/:id', callbackController.deleteCallBack)
router.get('/list/:page', callbackController.showCallBackList)
router.get('/:id', callbackController.showCallBack)


module.exports = router