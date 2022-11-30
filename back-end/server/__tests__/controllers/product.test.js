const Sequelize = require('sequelize')
const db = require('../../../sequelize/config/config.json')
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
        await mockedSequelize.sync();
    })

    afterAll(async () => {
        jest.clearAllMocks();
        await mockedSequelize.close();
    })

    describe("Add a product", ()=>{

        test("An error was occurred while saving", async ()=>{
            const req = {
                file:{
                    filename:'second.jpg'
                },
                body : {
                    name: 'asdw',
                    desciption: 'asdq',
                    picture : 'second.jpg',
                    price: 123,
                    categoryId: 21345667
                }
            }
            const res = mockResponse()
            filesService.mockUploadPhotos('second.jpg', 'product-photo')
            await productController.addProduct(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })

        test("Add a product without an error", async ()=>{
            const req = {
                file:{
                    filename:'second.jpg'
                },
                body : {
                    name: 'asdw',
                    desciption: 'asdq',
                    picture : 'second.jpg',
                    price: 123,
                    categoryId: 2
                }
            }
            const res = mockResponse()
            filesService.mockUploadPhotos('second.jpg', 'product-photo')
            await productController.addProduct(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:true})
                )
        })

      
    })

    describe("Show product page", ()=>{

        test("Show an product without an error", async ()=>{
            const req = {
                params: {id: 2}
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
                query : {category: 2},
                params: {page: 1}
            }
            const res = mockResponse()
            await productController.showProductList(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:expect.anything()})
            )
        })

        test("Wrong page specified", async()=>{
            const req = {
                query : {category: 2},
                params: {page: 14632}
            }
            const res = mockResponse()
            await productController.showProductList(req, res)
            expect(res.status).toHaveBeenCalledWith(404)
        })

        test("An error was occurred while fetching data", async()=>{
            const req = {
            }
            const res = mockResponse()
            await productController.showProductList(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })
    })

    describe("Update a product", ()=>{

        test("Update a product without an error", async()=>{
            const req = {
                params: {id: 2 },
                file: {filename: 'first.jpeg'},
                body:{
                    name:'adffg',
                    picturesForDeleting: ['first.jpeg']
                }
            }
            const res = mockResponse()
            filesService.mockUploadPhotos('first.jpeg', 'product-photo')
            filesService.mockUploadPhotos('second.jpg', 'product-photo')
            filesService.mockUploadPhotos('first.jpeg', 'product-photo', 'product-detail-photo')
            await productController.updateProduct(req, res)
            expect(res.send).toHaveBeenCalledWith(
                expect.stringContaining("{\"result\":true}")
            )
        })

        test("An error was occurred while updating", async()=>{
            const req = {
                params: {id: 1123454 },
                file: {filename: 'first.jpeg'},
                body:{
                    name:'adffg'
                }
            }
            const res = mockResponse()
            await productController.updateProduct(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })

    })

    describe("Upload detail product`s photos", ()=>{

        test("Upload a detail photo without an error", async()=>{
            const req = {
                params: {id: 2},
                files: [{filename: 'first.jpeg'}]
            }
            const res = mockResponse()
            filesService.mockUploadPhotos('first.jpeg','product-photo', 'product-detail-photo')
            await productController.uploadDetailPhotos(req, res)
            expect(res.send).toHaveBeenCalledWith(
                expect.stringContaining("{\"result\":true}")
            )
        })

        test("An error was occurred while uploading", async()=>{
            const req = {
                params: {id: 12325436435432},
                files: [{filename: 'first.jpeg'}]
                  
            }
            const res = mockResponse()
            filesService.mockUploadPhotos('first.jpeg','product-photo', 'product-detail-photo')
            await productController.uploadDetailPhotos(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })
        
    })

    describe("Delete a product", ()=>{

        test("Delete a product without an error", async()=>{
            const req = {
                params: {id:2}
            }
            const res = mockResponse()
            filesService.mockUploadPhotos('first.jpeg', 'product-photo', 'product-detail-photo')
            filesService.mockUploadPhotos('second.jpg', 'product-photo', 'product-detail-photo')
            filesService.mockUploadPhotos('first.jpeg', 'product-photo')

            await productController.deleteProduct(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:true})
            )
        })

        test("An error occurred while deleting product", async()=>{
            const req = {
                params: {id:12324552}
            }
            const res = mockResponse()           
            await productController.deleteProduct(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({error:'Помилка видалення даних'})
            )
        })
    })

})