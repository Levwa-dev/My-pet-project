const Sequelize = require('sequelize')
const db = require('../../../sequelize/config/config.json')
const callBackController = require('../../controllers/callback-controller')
const {CallBack} = require('../../../sequelize/models')

const mockResponse = () => {
    res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    res.send = jest.fn().mockReturnValue(res)
    return res
}

describe("The callBack controller testing", ()=>{
    beforeAll(async()=>{
        mockedSequelize = new Sequelize(db.test);
        await CallBack.bulkCreate([
            {
                id:1,
                firstName: 'Jack',
                lastName: 'Sparrow',
                number:'+380667270180',
                call:'Telegram',
                date: new Date()
            }
        ])
    })
    afterAll(async()=>{
        await CallBack.destroy({truncate: {cascade: true}})
        jest.clearAllMocks();
    })

    describe("Add callBack request", ()=>{
        test("Add callBack request without an error", async ()=>{
            const req = {
                body:{
                    firstName: 'Jack',
                    lastName: 'Sparrow',
                    number:'+380667270180',
                    call:'Telegram',
                }
            }
            const res = mockResponse()
            await callBackController.addCallBack(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:true})
            )
        })
        test("An error was occurred while adding to DB", async ()=>{
            const req = {
                body:{
                    call:'Telegram',
                }
            }
            const res = mockResponse()
            await callBackController.addCallBack(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })
    })
    describe("Show callBack", ()=>{
        test("Show callBack without an error", async()=>{
            const req = {
                params:{id : 1}
            }
            const res = mockResponse()
            await callBackController.showCallBack(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result: expect.anything()})
            )
        })
        test("Such data is not exist", async()=>{
            const req = {
                params:{id : 5}
            }
            const res = mockResponse()
            await callBackController.showCallBack(req, res)
            expect(res.status).toHaveBeenCalledWith(404)
        })
        test("An error occurred while fetching data", async()=>{
            const req = {params:{}}
            const res = mockResponse()
            await callBackController.showCallBack(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })

    })
    describe("Show callBack list", ()=>{
        test("Show callBack list without an error", async()=>{
            const req = {
                params:{ page:1 },
                query:{}
            }
            const res = mockResponse()
            await callBackController.showCallBackList(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:expect.anything()})
            )
        })
        test("Such data is not exist", async()=>{
            const req = {
                params:{ page:999 },
                query:{}
            }
            const res = mockResponse()
            await callBackController.showCallBackList(req, res)
            expect(res.status).toHaveBeenCalledWith(404)
        })
        test("An error occurred while fetching data", async()=>{
            const req = {
                params:{},
                query:{}
            }
            const res = mockResponse()
            await callBackController.showCallBackList(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })

    })
    describe("Delete callBack request", ()=>{
        test("Delete without an error", async()=>{
            const req = {
                params: {
                    id: 2
                }
            }
            const res = mockResponse()
            await callBackController.deleteCallBack(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:true})
            )
        })
        test("An error was occurred while deletting", async()=>{
            const req = {
                params: {}
            }
            const res = mockResponse()
            await callBackController.deleteCallBack(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })
    })

})