const Sequelize = require('sequelize')
const db = require('../../../sequelize/config/config.json')
const categoryConroller = require('../../controllers/category-controller')
const filesService = require('../../services/files-service')

const mockResponse = () => {
    res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    res.send = jest.fn().mockReturnValue(res)
    return res
}

describe('Category controller testing', ()=>{

    beforeAll(async () => {
        mockedSequelize = new Sequelize(db.test);
        await mockedSequelize.sync();
    })

    afterAll(async () => {
        jest.clearAllMocks();
        await mockedSequelize.close();
    })

    describe("Add category function", ()=>{

        test('Add not unique category to the database', async ()=>{
            const req = {
                body:{name:'Морозиво'}
            }
            const res = mockResponse()
            await categoryConroller.addCategory(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })
    
        test('Add category to the database', async ()=>{
            const req = {
                body:{name:'Дисерт'}
            }
            const res = mockResponse()
            await categoryConroller.addCategory(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:true})
                )
        })
    
        test('An error was occurred while saving to the database', async ()=>{
            const req = {
                body:{}
            }
            const res = mockResponse()
            await categoryConroller.addCategory(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })
    })

    describe("Show list of category function", ()=>{

        test("Wrong page specified", async()=>{
            const req = {
                params: { page: 12 }
            }
            const res = mockResponse()
            await categoryConroller.showCategoryList(req, res)
            expect(res.status).toHaveBeenCalledWith(404)
        })

        test("Show list without an error", async()=>{
            const req = {
                params: { page: 1 }
            }
            const res = mockResponse()
            await categoryConroller.showCategoryList(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result: expect.anything(), pages: expect.anything()})
            )
        })

        test("Show list without an error", async()=>{
            const req = {}
            const res = mockResponse()
            await categoryConroller.showCategoryList(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })
    })

    describe("Show category page", ()=>{
        
        test("Wrong category specified", async()=>{
            const req = {
                params: {id : 6}
            }
            const res = mockResponse()
            await categoryConroller.showCategory(req, res)
            expect(res.status).toHaveBeenCalledWith(404)
        })

        test("Show a category without an error", async()=>{
            const req = {
                params: {id : 1}
            }
            const res = mockResponse()
            await categoryConroller.showCategory(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result: expect.anything()})
            )
        })

        test("An error was occured while getting category", async()=>{
            const req = { params: {} }
            const res = mockResponse()
            await categoryConroller.showCategory(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })
    })
    
    describe("Update category info", ()=>{
        
        test("Update category without an error", async ()=>{
            const req = {
                body:{name:'Заморожений сік'},
                params: {id:1}
            }
            const res = mockResponse()
            await categoryConroller.updateCategory(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:true})
            )
        })

        test("An error was occurred while updating category", async()=>{
            const req = {
                body:{name:'Заморожений сік'},
                params:{}
            }
            const res = mockResponse()
            await categoryConroller.updateCategory(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })
    })

    describe("Delete an category", ()=>{
        test("Delete an category without an error", async ()=>{
            const req = {
                params: {id:1}
            }
            const res = mockResponse()
            filesService.mockUploadPhotos('first.jpeg', 'product-photo')
            filesService.mockUploadPhotos('first.jpeg', 'product-photo', 'product-detail-photo')
            await categoryConroller.deleteCategory(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:true})
            )
        })

        test("An error occurred while deletting category", async ()=>{
            const req = {
                params: {id:1}
            }
            const res = mockResponse()
            await categoryConroller.deleteCategory(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })
        
    })

})