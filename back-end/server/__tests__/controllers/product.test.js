const Sequelize = require('sequelize')
const db = require('../../../sequelize/config/config.json')
const {Category, Product, ProductPicture} = require('../../../sequelize/models')
const productController = require('../../controllers/product-controller')
const filesService = require('../../services/files-service')

const mockResponse = () => {
    res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    res.send = jest.fn().mockReturnValue(res)
    return res
}

describe('The product controller testing', ()=>{

    beforeAll(async () => {
        mockedSequelize = new Sequelize(db.test);
        await Category.bulkCreate([
            {
                id:1,
                name: 'Морозиво',
                product: true
            },
            {
                id:2,
                name: 'Десерти',
                product: true
            },
            {
                id:3,
                name: 'Солодощі',
                product: true
            }
        ])
        await Product.bulkCreate([
            {
                id:1,
                name: 'Ice',
                description: 'DataTypes.TEXT',
                picture: 'first.jpeg',
                oldPrice: null,
                rating: 0,
                bestOffer: false,
                price: 12,
                date: new Date(),
                sale: false,
                avaliable: true,
                categoryId: 1
              },
              {
                id:2,
                name: 'Candy',
                description: 'DataTypes.TEXT',
                picture: 'second.jpeg',
                oldPrice: null,
                rating: 0,
                bestOffer: true,
                price: 123,
                date: new Date(),
                sale: false,
                avaliable: true,
                categoryId: 2,
              },
              {
                id:3,
                name: 'Candy',
                description: 'DataTypes.TEXT',
                picture: 'second.jpeg',
                oldPrice: null,
                rating: 0,
                bestOffer: true,
                price: 123,
                date: new Date(),
                sale: false,
                avaliable: true,
                categoryId: 3,
              }
        ])
        await ProductPicture.bulkCreate([
            {
                picture:'first.jpeg',
                productId:1
            },
            {
                picture:'first.jpeg',
                productId:2
            }
        ])
    })

    afterAll(async () => {
        await Category.destroy({truncate: {cascade:true}});
        await Product.destroy({truncate: {cascade:true}});
        jest.clearAllMocks()
    })

    describe("Add a product", ()=>{

        test("Add a best offer without an error", async ()=>{
            const photo = Date.parse(new Date()) + 'second.jpeg'
            const req = {
                file:{
                    filename: photo
                },
                body : {
                    name: 'asdw',
                    desciption: 'asdq',
                    picture : photo,
                    price: 123,
                    categoryId: 2,
                    bestOffer:true
                }
            }
            const res = mockResponse()
            filesService.mockUploadPhotos(photo, 'product-photo')
            await productController.addProduct(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:true})
                )
        })

        test("An error was occurred while saving", async ()=>{
            const photo = Date.parse(new Date()) + 'first.jpeg'
            const req = {
                file:{
                    filename: photo
                },
                body : {
                    name: 'Ice2',
                    desciption: 'asdq',
                    picture : photo,
                    price: 123,
                    categoryId: 1213123
                }
            }
            const res = mockResponse()
            filesService.mockUploadPhotos(photo, 'product-photo')
            await productController.addProduct(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })
    })

    describe("Show product page", ()=>{

        test("Show an product without an error", async ()=>{
            const req = {
                params: {id: 2},
                originalUrl: '/shop/product/2'
            }
            const res = mockResponse()
            await productController.showProduct(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:expect.anything()})
            )
        })

        test("The product not found", async ()=>{
            const req = {
                params: {id: 124512331}
            }
            const res = mockResponse()
            await productController.showProduct(req, res)
            expect(res.status).toHaveBeenCalledWith(404)
        })

        test("An error was occurred while fetching  the product", async ()=>{
            const req = {
                params: {}
            }
            const res = mockResponse()
            await productController.showProduct(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })

    })

    describe("Show product list page", ()=>{
        test("Show product list without an error", async()=>{
            const req = {
                query:{},
                params: {page: 1, category:2}
            }
            const res = mockResponse()
            await productController.showProductList(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:expect.anything()})
            )
        })

        test("Wrong page specified", async()=>{
            const req = {
                query:{},
                params: {page: 14632, category: 2}
            }
            const res = mockResponse()
            await productController.showProductList(req, res)
            expect(res.status).toHaveBeenCalledWith(404)
        })

        test("An error was occurred while fetching data", async()=>{
            const req = {}
            const res = mockResponse()
            await productController.showProductList(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })
    })

    describe("Update a product", ()=>{

        test("Update a product without an error", async()=>{
            const photo = Date.parse(new Date()) + 'third.jpeg'
            const req = {
                params: {id: 4 },
                file: {filename: photo},
                body: {
                    name: 'adffg',
                    picturesForDeleting: "[\"first.jpeg\"]",
                    bestOffer: true
                }
            }
            const res = mockResponse()
            filesService.mockUploadPhotos(photo, 'product-photo')
            filesService.mockUploadPhotos('first.jpeg', 'product-photo', 'product-detail-photo')
            await productController.updateProduct(req, res)
            expect(res.send).toHaveBeenCalledWith(
                expect.stringContaining("{\"result\":true}")
            )
        })

        test("An error was occurred while updating", async()=>{
            const photo = Date.parse(new Date()) + 'first.jpeg'
            const req = {
                params: {id: 1123454 },
                file: {filename: photo},
                body:{
                    name:'adffg'
                }
            }
            const res = mockResponse()
            filesService.mockUploadPhotos(photo, 'product-photo')
            await productController.updateProduct(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })

    })

    describe("Upload detail product`s photos", ()=>{

        test("Upload a detail photo without an error", async()=>{
            const photo = Date.parse(new Date()) + 'first.jpeg'
            const req = {
                params: {id: 4},
                files: [{filename: photo}]
            }
            const res = mockResponse()
            filesService.mockUploadPhotos(photo,'product-photo', 'product-detail-photo')
            await productController.uploadDetailPhotos(req, res)
            expect(res.send).toHaveBeenCalledWith(
                expect.stringContaining("{\"result\":true}")
            )
        })

        test("An error was occurred while uploading", async()=>{
            const photo = 'first.jpeg'
            const req = {
                params: {id: 12325436435432},
                files: [{filename: photo}]
                  
            }
            const res = mockResponse()
            filesService.mockUploadPhotos(photo,'product-photo', 'product-detail-photo')
            await productController.uploadDetailPhotos(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })
        
    })

    describe("Delete a product", ()=>{

        test("Delete a product without an error", async()=>{
            const req = {
                params: {id:4}
            }
            const res = mockResponse()
            await productController.deleteProduct(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:true})
            )
        })

        test("An error occurred while deleting product", async()=>{
            const req = {}
            const res = mockResponse()           
            await productController.deleteProduct(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({error:'Помилка видалення даних'})
            )
        })
    })

    describe("Show product list for admin panel", ()=>{
        test("Show product without an error", async ()=>{
            const req = {
                params: { page:1 },
                query: { name:'Candy' }
            }
            const res = mockResponse()
            await productController.showProductListForAdminPanel(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:expect.anything()})
            )
        })

        test("An error occurred while fetching data", async ()=>{
            const req = {
                query: { id:1 }
            }
            const res = mockResponse()
            await productController.showProductListForAdminPanel(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })

        test("No such data", async ()=>{
            const req = {
                params: { page:1 },
                query: { id:6 }
            }
            const res = mockResponse()
            await productController.showProductListForAdminPanel(req, res)
            expect(res.status).toHaveBeenCalledWith(404)
        })
    })

    describe("Show products on Main", ()=>{
        test("Show product without an error", async()=>{
            const req = {}
            const res = mockResponse()
            await productController.showProductsOnMain(req,res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result: expect.anything()})
            )
        })

        test("An error occurred while fetching", async()=>{
            const req = {}
            const res = mockResponse()
            await Product.destroy({truncate: {cascade:true}})
            await productController.showProductsOnMain(req,res)
            expect(res.status).toHaveBeenCalledWith(500)
        })

    })

    describe("Get categories", ()=>{

        test("Get categories without an error", async ()=>{
            const req = {}
            const res = mockResponse()
            await productController.getCategories(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:expect.anything()})
            )
        })

        test("Such data is not exist", async ()=>{
            const req = {}
            const res = mockResponse()
            await Category.destroy({truncate: {cascade:true}})
            await productController.getCategories(req, res)
            expect(res.status).toHaveBeenCalledWith(404)
        })
    })

})