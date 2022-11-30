const {Product, ProductPicture} = require('../../sequelize/models')

const FilesService = require('../services/files-service')
const PaginationServies = require('../services/pagination-service')

const imageDir = 'product-photo'
const detailImageDir = 'product-detail-photo'

class ProductController {
   
    async addProduct(req, res) {
        const file = req.file
        try {
            const params = req.body
            await Product.create({...params, picture: file.filename})
            res.json({result:true})
        } catch (e) {
            FilesService.deleteSyncFile(file.filename, imageDir)
            res.status(500).json({error:'Помилка при створенні запису'})
        }
    }

    async showProduct(req, res) {
        try {
            const {id} = req.params
            const product = await Product.findOne({where:{id}})
            if(!product){
                return res.status(404).json({error:'Такого товару не знайдено'})
            }
            const productPictures = await product.getProductPictures()
            const category = await product.getCategory()
            product.setDataValue('pictures', productPictures)
            product.setDataValue('category', category)
            res.json({result:product})
        } catch (e) {
            res.status(500).json({error:'Помилка завантаження даних'})
        }
    }

    async showProductListForAdminPanel(req, res) {
        try {
            const {orderedBy = 'ASC'} = req.query
            const productCount = await Product.findAndCountAll()
            const {limit, offset, pages} = await PaginationServies.getPaginatedData(productCount, 20, req.params.page)
            const products = await Product.findAll({
                order: [['price', orderedBy]],
                limit,
                offset})
            if(!products){
                return res.status(404).json({error:'Невірно вказана сторінка'})
            }
            for(let product of products){
                const category = await product.getCategory()
                product.setDataValue('category', category)
            }
            res.json({result:products, pages})
        } catch (e) {
            res.status(500).json({error:'Помилка завантаження даних'})
        }
        
    }

    async showProductList(req, res) {
        try {
            const {orderedBy = 'ASC', category} = req.query
            const productCount = await Product.findAndCountAll({where:{categoryId:category}})
            const {limit, offset, pages} = await PaginationServies.getPaginatedData(productCount, 20, req.params.page)
            const products = await Product.findAll({
                order: [['price', orderedBy]],
                where:{categoryId:category},
                limit,
                offset
            })
            if(!products.length){
                return res.status(404).json({error:'Невірно вказана сторінка'})
            }
            res.json({result:products, pages})
        } catch (e) {
            res.status(500).json({error:'Помилка завантаження даних'})
        }
        
    }

    async updateProduct (req, res) {
        try {
            const {id} = req.params
            const {file} = req
            if(req.body.picturesForDeleting){
                for(let picture of req.body.picturesForDeleting){
                    await ProductPicture.destroy({where:{picture}})
                    FilesService.deleteAsyncFile(picture, imageDir, detailImageDir)
                }
                delete req.body.picturesForDeleting
            }
            if(file){
                const product = await Product.findOne({where:{id}})
                req.body.picture = file.filename
                FilesService.deleteAsyncFile(product.picture, imageDir)
            }
            await Product.update({...req.body}, {where:{id}})
            res.send(JSON.stringify({result:true}))
        } catch (e) {
            if(req.file){
                FilesService.deleteSyncFile(req.file.filename, imageDir)
            }
            res.status(500).send(JSON.stringify({error:'Помилка перепису даних'}))
        }
    }

    async uploadDetailPhotos (req, res) {
        const {id} = req.params
        const {files} = req
        try {
            for(let file of files){
                await ProductPicture.create({ picture: file.filename, productId:id})
            }
            res.send(JSON.stringify({result:true}))
        } catch (e) {
            for(let file of files){
               FilesService.deleteSyncFile(file.filename, imageDir, detailImageDir)
            }
            res.status(500).send(JSON.stringify({error:'Помилка завантаження фотографій'}))
        }
    }

    async deleteProduct (req, res) {
        try {
            const {id} = req.params
            const product = await Product.findOne({where:{id}})
            const productPhotos = await product.getProductPictures()
            await Product.destroy({where:{id}})
            for(let photo of productPhotos) {
                FilesService.deleteAsyncFile(photo.picture, imageDir, detailImageDir)
            }
            FilesService.deleteAsyncFile(product.picture, imageDir)
            
            res.json({result:true})
        } catch (e) {
            res.json({error:'Помилка видалення даних'})
        }
    }

  
}

module.exports = new ProductController()