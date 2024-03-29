const {Category} = require('../../sequelize/models')
const PaginationServies = require('../services/pagination-service')

const FilesService = require('../services/files-service')

class CategoryController {
    async addCategory (req, res) { // Функція додавання категорій
        try {
            const {name, product} = req.body
            const category = await Category.findOne({where:{name}})
            if(category){
                return res.status(500).json({error:'Така категорія вже в системі'})
            }
            await Category.create({name, product})
            res.json({result:true})
        } catch (e) {
            return res.status(500).json({error:'Помилка при збереженні'})
        }
    }

    async showCategoryList (req, res) { // Функція показу списку категорій
        try {
            const query = { ...req.query }
            const categoryCount = await Category.findAndCountAll({where:query})
            const {limit, offset, pages} = PaginationServies.getPaginatedData(categoryCount, 20, req.params.page)
            const categories = await Category.findAll({where:query, limit, offset})
            if(categories.length){
                return res.json({result:categories, pages})
            }
            res.status(404).json({error:'Жодної категорії'})
        } catch (e) {
            res.status(500).json({error:'Помилка завантаження даних'})
        }
    }

    async showCategory (req, res) { // Функція показу категорії
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
    
    async updateCategory (req, res) { // Функція редагування категорії
        try {
            const {id} = req.params
            await Category.update({...req.body}, {where:{id}})
            res.json({result:true})
        } catch (e) {
            res.status(500).json({error:'Помилка редагування даних'})
        }
    }

    async deleteCategory (req, res) { // Функція видалення категорії
        try {
            const {id} = req.params
            const category = await Category.findOne({where:{id}})
            const products = await category.getProducts()
            for(let product of products) {                  // Видалення всіх дочерніх фото з тек серверу
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

    async showBoxCategory (req, res) { // Відображення категорії, яка містить пакунки для товарів
        try {
            const category = await Category.findOne({where:{product:false}})
            if(!category) {
                throw new Error()
            }
            res.json({result:category})
        } catch (e) {
            res.status(500).json({error:"Помилка з'єднання з сервером"})
        }
        
    }
}
module.exports = new CategoryController()