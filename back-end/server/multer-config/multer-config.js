const multer = require('multer')
const path = require('path')

const storage = (mainPath, childrenPath) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      !childrenPath ? 
        cb(null, path.resolve(__dirname, '..', 'public', mainPath))
        :
        cb(null, path.resolve(__dirname, '..', 'public', mainPath, childrenPath))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now()
      cb(null, uniqueSuffix+'-'+file.originalname)
    }
  })
}

module.exports = {
    productUpload : multer({ storage: storage('product-photo') }),
    productDetailUpload : multer({ storage: storage('product-photo', 'product-detail-photo') })
}