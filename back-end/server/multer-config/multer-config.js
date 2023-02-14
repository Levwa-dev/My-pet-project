const multer = require('multer')
const path = require('path')

const storage = (mainPath, childrenPath) => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      !childrenPath ? // Вказуємо різний шлях для завантаження фотографій
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
    productUpload : multer({ storage: storage('product-photo') }), // Multer для завантаження головного фото товару
    productDetailUpload : multer({ storage: storage('product-photo', 'product-detail-photo') }) // Multer для завантаження додаткових фото товару
}