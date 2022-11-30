const Sequelize = require('sequelize')
const db = require('../../../sequelize/config/config.json')
const orderController = require("../../../server/controllers/order-controller")

const mockResponse = () => {
    res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    res.send = jest.fn().mockReturnValue(res)
    return res
}

describe("The order controller testing", ()=>{
    beforeAll(async () => {
        mockedSequelize = new Sequelize(db.test);
        await mockedSequelize.sync();
    })

    afterAll(async () => {
        jest.clearAllMocks();
        await mockedSequelize.close();
    })

    describe("Make an order", ()=>{

        test("Add order without an error", async()=>{
            const req = {
                body: {
                    orderedProducts: [
                        {   
                            productId: 3,
                            name: 'DataTypes.STRING',
                            quantity: 2,
                            price: 123,
                        }
                    ],
                    chossedBox: [
                        {
                            boxName: 'DataTypes.STRING',
                            boxId: 1,
                            productName: 'DataTypes.STRING',
                            productId: 3,
                        }
                    ],
                    orderInfo:  {
                        firstName:'Jake',
                        lastName:'Salivan',
                        patronymic:'Jackovich',
                        telephone:'+380671892190',
                        street:'qwes',
                        building:'dwa',
                        sector:2,
                        payment:'Готівка',
                        orderNumber: '12133451',
                        totalPrice: 123,
                        comment:'asdwadsdwadsdwa',
                        date: new Date()
                      }
                }
            }
            const res = mockResponse()
            await orderController.addOrder(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:true})
            )
        })

        test("Сause an error due to an empty list of ordered products", async()=>{
            const req = {
                body: {
                    orderedProducts: [],
                    orderInfo:  {
                        firstName:'Jake',
                        lastName:'Salivan',
                        patronymic:'Jackovich',
                        telephone:'+380671892190',
                        street:'qwes',
                        building:'dwa',
                        sector:2,
                        payment:'Готівка',
                        orderNumber: '12133451',
                        totalPrice: 123,
                        comment:'asdwadsdwadsdwa',
                        date: new Date()
                      }
                }
            }
            const res = mockResponse()
            await orderController.addOrder(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })

        test("An error was occurred while saving", async()=>{
            const req = {
                body: {
                    orderInfo:  {
                        firstName:'Jake',
                        lastName:'Salivan',
                        patronymic:'Jackovich',
                        telephone:'+380671892190',
                        street:'qwes',
                        building:'dwa',
                        sector:2,
                        payment:'Готівка',
                        orderNumber: '12133451',
                        totalPrice: 123,
                        comment:'asdwadsdwadsdwa',
                        date: new Date()
                      }
                }
            }
            const res = mockResponse()
            await orderController.addOrder(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })


    })

    describe("Show order info", ()=>{

        test("Show order info without an error", async()=>{
            const req = {
                params: { id: 1}
            }
            const res = mockResponse()
            await orderController.showOrder(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:expect.anything()})
            )
        })

        test("An error was occurred while fetching", async()=>{
            const req = {
                params: {}
            }
            const res = mockResponse()
            await orderController.showOrder(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })
    })

    describe("Show an order list", ()=>{
        test("Show an order list without an error", async()=>{
            const req = {
                params: {
                    page:1
                },
                query:{
                    orderedBy: 'ASC'
                }
            }
            const res = mockResponse()
            await orderController.showOrderList(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:expect.anything(), pages:1})
            )
        })

        test("An error occurred while fetching data", async()=>{
            const req = {
                params: {
                    page:4
                },
            }
            const res = mockResponse()
            await orderController.showOrderList(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })
    })

    describe("Update an order", ()=>{
        test("Update order without an error", async()=>{
            const req = {
                params: {id:2},
                body:{
                    products: [
                        {id:2, delete:true},
                        {
                            delete:false,   
                            productId: 3,
                            name: 'DataTyp',
                            quantity: 2,
                            price: 123
                        }
                    ],
                    boxes: [
                        {id:2, delete:true},
                        {
                            boxName: 'DataTypes.STRING',
                            boxId: 1,
                            productName: 'DataTypes.STRING',
                            productId: 3,
                        }

                    ],
                    info:{
                        firstName:'Bob'
                    }
                }
            }
            const res = mockResponse()
            await orderController.updateOrder(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:true})
            )
        })

        test("Update order without an error", async()=>{
            const req = {
                params: {id:5},
                body:{}
            }
            const res = mockResponse()
            await orderController.updateOrder(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })
    })

    describe("Delete an order", ()=>{
        test("Delete an order without an error", async()=>{
            const req = {
                params: {id:2}
            }
            const res = mockResponse()
            await orderController.deleteOrder(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:true})
            )
        })

        test("An error occurred while deleting", async()=>{
            const req = {
                params: {}
            }
            const res = mockResponse()
            await orderController.deleteOrder(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })

    })


    
})