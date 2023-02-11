const Sequelize = require('sequelize')
const db = require('../../../sequelize/config/config.json')
const orderController = require("../../../server/controllers/order-controller")
const {InBox, OrderInfo, OrderProduct, Product, Category} = require('../../../sequelize/models')

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
        await OrderInfo.bulkCreate([
            {   id:1,
                firstName:'Jake',
                lastName:'Salivan',
                telephone:'+380671892190',
                street:'qwes',
                building:'dwa',
                sector:2,
                payment:'Готівка',
                orderNumber:'1234456777700',
                totalPrice: 123,
                comment:'asdwadsdwadsdwa',
                date: new Date()
            }
        ])
        await OrderProduct.bulkCreate([
            {   
                id:1,
                productId: 1,
                name: 'DataTypes.STRING',
                price: 123,
                orderInfoId: 1
            }
        ])
        await InBox.bulkCreate([
            {
                id:1,
                boxName: 'DataTypes.STRING',
                boxId: 1,
                productName: 'DataTypes.STRING',
                productId: 2,
                orderInfoId:1
            }
        ])
        await Category.bulkCreate([
            {
                id:1,
                name: 'Морозиво',
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
              }
        ])
    })

    afterAll(async () => {
        await OrderInfo.destroy({truncate: {cascade: true}})
        await Category.destroy({truncate: {cascade: true}})
        jest.clearAllMocks();
    })

    describe("Make an order", ()=>{

        test("Add order without an error", async()=>{
            const req = {
                body: {
                    orderedProducts: [
                        {   
                            productId: 3,
                            name: 'DataTypes.STRING',
                            price: 122
                        }
                    ],
                    choosedBox: [
                        {
                            boxName: 'DataTypes.STRING',
                            boxId: 1,
                            productName: 'DataTypes.STRING',
                            productId: 3,
                            price: 1
                        }
                    ],
                    orderInfo:  {
                        firstName:'Jake',
                        lastName:'Salivan',
                        telephone:'+380671892190',
                        street:'qwes',
                        building:'dwa',
                        sector:2,
                        payment:'Готівка',
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
                    orderedBy: 'DESC'
                }
            }
            const res = mockResponse()
            await orderController.showOrderList(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:expect.anything(), pages:1})
            )
        })

        test("Such data is not exist", async()=>{
            const req = {
                params: {
                    page:4
                },
                query:{}
            }
            const res = mockResponse()
            await orderController.showOrderList(req, res)
            expect(res.status).toHaveBeenCalledWith(404)
        })

        test("An error was occurred while fetching", async()=>{
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
                    orderedProducts: [
                        {id:2, delete:true},
                        {
                            delete:false,   
                            productId: 3,
                            name: 'DataTyp',
                            price: 123
                        }
                    ],
                    choosedBox: [
                        {id:2, delete:true},
                        {
                            boxName: 'DataTypes.STRING',
                            boxId: 1,
                            productName: 'DataTypes.STRING',
                            productId: 3,
                            price: 123
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

        test("An error was occurred while updating", async()=>{
            const req = {
                params: {},
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

    describe("Find a product", ()=>{
        test("Find a product without an error", async()=>{
            const req = {
                query: {name:"Ice"}
            }
            const res = mockResponse()
            await orderController.findProduct(req, res)
            expect(res.json).toHaveBeenCalledWith(
                expect.objectContaining({result:expect.anything()})
            )
        })
        test("Such data is not exist", async()=>{
            const req = {
                query: { name:'QWERR'}
            }
            const res = mockResponse()
            await orderController.findProduct(req, res)
            expect(res.status).toHaveBeenCalledWith(404)
        })
        test("An error occurred while fetching data", async()=>{
            const req = {}
            const res = mockResponse()
            await orderController.findProduct(req, res)
            expect(res.status).toHaveBeenCalledWith(500)
        })
    })

})