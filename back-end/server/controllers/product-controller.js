const {Product, ProductPicture, Category} = require('../../sequelize/models')

const FilesService = require('../services/files-service')
const PaginationServies = require('../services/pagination-service')

const imageDir = 'product-photo'
const detailImageDir = 'product-detail-photo'

class ProductController {
   
    async addProduct(req, res) {
        const file = req.file
        try {
            const params = req.body
            if(params.bestOffer) { // якщо є вже наявна краща пропозиція, прибираємо її
                const currentBestOffer = await Product.findOne({where:{bestOffer:true}})
                if(currentBestOffer) await Product.update({bestOffer:false}, {where:{id:currentBestOffer.id}})
            }
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
            if(req.originalUrl === `/shop/product/${id}`) {
                const rating = product.rating + 1
                await Product.update({rating}, {where:{id}})
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
            const {orderColumn = 'date', orderedBy = 'DESC'} = req.query
            let query = {...req.query}
            if(query){
                if(query.orderColumn) delete query.orderColumn
                if(query.orderedBy) delete query.orderedBy
            }
            const productCount = await Product.findAndCountAll({where:query})
            const {limit, offset, pages} = PaginationServies.getPaginatedData(productCount, 20, req.params.page)
            const products = await Product.findAll({
                where: query,
                order: [[orderColumn, orderedBy]],
                limit,
                offset
            })
            if(!products.length){
                return res.status(404).json({error:'Такі товари відстуні'})
            }
            for(let product of products){
                const category = await product.getCategory()
                product.setDataValue('category', category.name)
            }
            res.json({result:products, pages})
        } catch (e) {
            res.status(500).json({error:'Помилка завантаження даних'})
        }
        
    }

    async getCategories (req, res) {
        try {
            const categories = await Category.findAll()
            if(!categories.length){
                return res.status(404).json({error:'Жодної категорії'})
            }
            res.json({result:categories})
        } catch (e) {
            res.status(500).json({error:'Помилка завантаження даних'})
        }
    }

    async showProductList(req, res) {
        try {
            const {orderedBy = 'DESC'} = req.query
            const {page, category} = req.params
            const productCount = await Product.findAndCountAll({where:{categoryId:category, avaliable:true}})
            const {limit, offset, pages} = PaginationServies.getPaginatedData(productCount, 10, page)
            const products = await Product.findAll({
                order: [['price', orderedBy]],
                where:{categoryId:category, avaliable:true},
                limit,
                offset
            })
            if(!products.length){
                return res.status(404).json({error:'Невірно вказана сторінка'})
            }
            const {name} = await Category.findOne({where:{id:category}})
            for(let product of products){
                product.setDataValue('category', name)
            }
            res.json({result:products, pages})
        } catch (e) {
            res.status(500).json({error:'Помилка завантаження даних'})
        }
        
    }

    async updateProduct (req, res) {
        try {
            const { id } = req.params
            const { file } = req
            let { picturesForDeleting } = req.body
            if(picturesForDeleting){ // якщо є список фото для видалення
                picturesForDeleting = JSON.parse(picturesForDeleting)
                for(let picture of picturesForDeleting) {
                    await ProductPicture.destroy({where:{picture}})
                    FilesService.deleteAsyncFile(picture, imageDir, detailImageDir)
                }
                delete req.body.picturesForDeleting
            }
            if(file){ // якщо змінюємо головне фото 
                const product = await Product.findOne({where:{id}})
                req.body.picture = file.filename
                FilesService.deleteAsyncFile(product.picture, imageDir)
            }
            if(req.body.bestOffer) { // якщо є вже наявна краща пропозиція, прибираємо її
                const currentBestOffer = await Product.findOne({where:{bestOffer:true}})
                if(currentBestOffer) await Product.update({bestOffer:false}, {where:{id:currentBestOffer.id}})
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
            res.status(500).json({error:'Помилка видалення даних'})
        }
    }
    
    async showProductsOnMain (req, res) {
        try {
            const bestOffer = await Product.findOne({attributes:["id","name","picture","description"], where:{bestOffer:true}})
            const products = []
            const categories = ['Морозиво',"Десерти","Солодощі"]
            for(let categoryName of categories){
                const category = await Category.findOne({where:{name:categoryName}})
                const categoryProducts = await Product.findAll({
                    order: [['rating', 'DESC']],
                    attributes:["id","name",'price',"picture","description", "categoryId"],
                    where:{categoryId:category.id, bestOffer:false, avaliable:true},
                    limit:3,
                })
                for(let product of categoryProducts){
                    product.setDataValue('category', categoryName)
                    products.push(product)
                }
            } 
            if(!products.length){
                throw new Error ()
            }
            res.json({result:products, bestOffer})      
        } catch (e) {
            res.status(500).json({error:"Помилка з'єднання з сервером"})
        }
    }
}

module.exports = new ProductController()