const {InBox, OrderInfo, OrderProduct, Product} = require('../../sequelize/models')
const PaginationServies = require('../services/pagination-service')

class OrderController {
    
    async addOrder(req, res) {
        let order
        try {
            const {orderedProducts, choosedBox, orderInfo} = req.body
            if(!orderedProducts.length){
               throw new Error()
            }
            let totalPrice = 0
            orderedProducts.map(item=>totalPrice += item.price)
            orderInfo.orderNumber = JSON.stringify(Date.parse(new Date()))
            orderInfo.totalPrice = totalPrice
            order = await OrderInfo.create({...orderInfo})
            for(let orderedProduct of orderedProducts) {
                await OrderProduct.create({...orderedProduct, orderInfoId: order.id})
            }
            if(choosedBox.length){
                for(let box of choosedBox) {
                    await InBox.create({...box, orderInfoId: order.id})
                }
            }
            res.json({result:true})
        } catch (e) {
            if (order) await OrderInfo.destroy({where:{id:order.id}})
            res.status(500).json({error:'При замовленні виникла помилка'})
        }
        
    }

    async showOrder(req, res){
        try {
            const {id} = req.params
            const order = await OrderInfo.findOne({where:{id}})
            order.setDataValue('orderedProducts', await order.getOrderProducts())
            order.setDataValue('choosedBox', await order.getInBoxes())   
            res.json({result: order})
        } catch (e) {
            res.status(500).json({error:"Помилка зчитування даних"})
        }
    }

    async showOrderList (req, res) {
        try {
            const {orderedBy = 'DESC'} = req.query
            const params = req.query
            if(params){
                delete params.orderedBy
            }
            const {page} = req.params
            const orderCount = await OrderInfo.findAndCountAll({where:params})
            const {limit, offset, pages} = PaginationServies.getPaginatedData(orderCount, 20, page)
            const orderList = await OrderInfo.findAll({
                where:params,
                order: [['date', orderedBy]],
                limit,
                offset,
                attributes:[
                    "id",
                    "firstName",
                    "lastName",
                    "patronymic",
                    "telephone",
                    'totalPrice',
                    "payment",
                    'orderNumber',
                    'date'
                ]
            })
            if(!orderList.length){
                return res.status(404).json({error:'Замовлення відстуні'})
            }
            res.json({result:orderList, pages})
        } catch (e) {
            res.status(500).json({error:"Помилка зчитування даних"})
        }
    }

    async updateOrder (req, res) {
        try {
            const {id} = req.params
            console.log(req.body)
            const {orderedProducts, choosedBox, orderInfo} = req.body
            if(orderInfo) await OrderInfo.update({...orderInfo}, {where:{id}})
            if(orderedProducts){
                for(let product of orderedProducts) {
                    if(product?.delete){
                        await OrderProduct.destroy({where:{id:product.id}})
                    }
                    else{
                        await OrderProduct.create({...product, orderInfoId:id})
                    }
                }
            }
            if(choosedBox){
                for(let box of choosedBox) {
                    if(box?.delete) {
                        await  InBox.destroy({where:{id:box.id}})
                    }
                    else{
                        await InBox.create({...box, orderInfoId:id})
                    }      
                }
            }
            res.json({result:true})
        } catch (e) {
            console.log(e)
            res.status(500).json({error:'Сталася помилка при редагуванні'})
        }
        
    }

    async deleteOrder (req, res) {
        try {
            const {id} = req.params
            await OrderInfo.destroy({where:{id}})
            res.json({result:true})
        } catch (e) {
            res.status(500).json({error:"Помилка видалення даних"})
        }
        
    }
    
    async findProduct (req, res) {
        try {
            const {name} = req.query
            const product = await Product.findOne({where:{name}})
            if(product){
                return res.json({result:product})
            }
            res.status(404).json({error:"Такого товару не існує"})
        } catch (e) {
            res.status(500).json({error:"Помилка з'єднання з сервером"})
        }
    }

}

module.exports = new OrderController()