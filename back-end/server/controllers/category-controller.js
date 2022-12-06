const {Category} = require('../../sequelize/models')
const PaginationServies = require('../services/pagination-service')
const { Op } = require('sequelize')

const FilesService = require('../services/files-service')

class CategoryController {

    async addCategory(req, res) {
        try {
            const {name} = req.body
            const category = await Category.findOne({where:{name}})
            if(category){
                return res.status(500).json({error:'Така категорія вже в системі'})
            }
            await Category.create({name})
            res.json({result:true})
        } catch (e) {
            return res.status(500).json({error:'Помилка при збереженні'})
        }
    }

    async showCategoryList(req, res) {
        try {
            const query = { where:{...req.query} }
            const categoryCount = await Category.findAndCountAll(query)
            const {limit, offset, pages} = await PaginationServies.getPaginatedData(categoryCount, 20, req.params.page)
            const categories = await Category.findAll(query,{ limit, offset})
            if(categories.length){
                return res.json({result:categories, pages})
            }
            res.status(404).json({error:'Жодної категорії'})
        } catch (e) {
            res.status(500).json({error:'Помилка завантаження даних'})
        }
    }

    async showCategory (req, res) {
        try {
            const {id} = req.params
            const category =  await Category.findOne({where:{id}})
            if(category){
                return res.json({result:category})
            }
            res.status(404).json({error:'Такої категорії не існує'})
        } catch (e) {
            res.status(500).json({error:'Помилка завантаження даних'})
        }
    }
    
    async updateCategory (req, res) {
        try {
            const {id} = req.params
            await Category.update({...req.body}, {where:{id}})
            res.json({result:true})
        } catch (e) {
            res.status(500).json({error:'Помилка редагування даних'})
        }
    }

    async deleteCategory (req, res) {
        try {
            const {id} = req.params
            const category = await Category.findOne({where:{id}})
            const products = await category.getProducts()
            
            for(let product of products) {                  // Видалення всіх дочерніх фото
                const productPictures = await product.getProductPictures()
                for(let photo of productPictures){
                    FilesService.deleteAsyncFile(photo.picture, 'product-photo', 'product-detail-photo')
                }
                FilesService.deleteAsyncFile(product.picture, 'product-photo')
            }
            await Category.destroy({where:{id}})
            res.json({result:true})
        } catch (e) {
            res.status(500).json({error:'Помилка видалення даних'})
        }
    }


}
module.exports = new CategoryController()