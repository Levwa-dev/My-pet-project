const {CallBack} = require('../../sequelize/models')

const PaginationServies = require('../services/pagination-service')

class CallbackController {
    async addCallBack(req, res) {
        try {
            const {firstName, lastName, number, call} = req.body
            if(!firstName || !lastName || !number || !call){
                throw new Error()
            }
            await CallBack.create({...req.body})
            res.json({result:true})
        } catch (e) {
            res.status(500).json({error:'Виникла помилка, спробуйте пізніше'})
        }
    }

    async showCallBack(req, res) {
        try {
            const {id} = req.params
            if(!id){
                throw new Error() 
            }
            const callBack = await CallBack.findOne({where:{id}})
            if(!callBack) {
                return res.status(404).json({error:"Такого запису не існує"})
            }
            res.json({result:callBack})
        } catch (e) {
            res.status(500).json({error:'Виникла помилка, спробуйте пізніше'})
        }
    }

    async showCallBackList(req, res) {
        try {
            const {page} = req.params
            const query = { ...req.query }
            if(!page){
                throw new Error()
            }
            const callBackCount = await CallBack.findAndCountAll({where:query})
            const {limit, offset, pages} = PaginationServies.getPaginatedData(callBackCount, 20, page)
            const callBacks =  await CallBack.findAll({
                where:query,
                order: [['date', 'DESC']],
                limit,
                offset
            })
            if(!callBacks.length){
                return res.status(404).json({error:"Такого запиту не існує"})
            }
            return res.json({result:callBacks, pages})
        } catch (e) {
            console.log('-----'+ e)
            res.status(500).json({error:'Виникла помилка, спробуйте пізніше'})
        }
    }

    async deleteCallBack (req, res) {
        try {
            const {id} = req.params
            if(!id){
                throw new Error()
            }
            await CallBack.destroy({where:{id}})
            res.json({result:true})
        } catch (e) {
            res.status(500).json({error:'Виникла помилка, спробуйте пізніше'})
        }
    }
}

module.exports = new CallbackController ()