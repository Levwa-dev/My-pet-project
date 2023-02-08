const { User } = require('../../sequelize/models')
const bcrypt = require('bcrypt')
const PaginationServies = require('../services/pagination-service')

class UserController {
    async addAdmin(req, res) {
        try {
            const {name, email, password} = req.body
            if(!name || !email || !password){
                throw new Error("Відсутні потрібні для реєстрації дані")
            }
            const user = await User.findOne({where:{email}})
            if(user){
                throw new Error("Такий користувач вже існує")
            }
            const hashPassword = bcrypt.hashSync(password, 10)
            await User.create({...req.body, password:hashPassword, isAdmin:true})
            res.json({result:true})
        } catch (e) {
            res.status(500).json({error: e.message})
        }
    }
    async getAdmin(req, res) {
        try {
            const {id} = req.params
            if(!id){
                throw new Error()
            }
            const user = await User.findOne({where:{id, isAdmin:true}})
            if(!user){
                return res.status(404).json({error:'Такого користувача не існує'})
            }
            res.json({result:user})
        } catch (e) {
            res.status(500).json({error:"При отриманні даних виникла помилка"})
        }
    }
    async getAdminList(req, res) {
        try {
            const {page} = req.params
            if(!page) {
                throw new Error()
            }
            const adminCount = await User.findAndCountAll({where:{...req.query, isAdmin:true}})
            const {limit, offset, pages} = PaginationServies.getPaginatedData(adminCount, 20, page)
            const admins = await User.findAll({
                where:{...req.query, isAdmin:true},
                order: [['date', 'DESC']],
                limit,
                offset
            })
            if(!admins.length){
                return res.status(404).json({error:'Користувачів не знайдено'})
            }
            res.json({result:admins, pages})
        } catch (e) {
            res.status(500).json({error:"При отриманні даних виникла помилка"})
        }
    }
    async updateAdmin(req, res) {
        try {
            const {id} = req.params
            const { password, email } = req.body
            if(!id){
                throw new Error()
            }
            if(password){
                req.body.password = bcrypt.hashSync(password, 10)
            }
            if(email){
                const user = await User.findOne({where:{email}})
                if(user && user.id !== id){
                    return res.status(500).json({error:"Така пошта вже зайнята"})
                }
            } 
            await User.update({...req.body}, {where:{id}})
            res.json({result:true})
        } catch (e) {
            console.log(e.message)
            res.status(500).json({error:"При редагуванні даних виникла помилка"})
        }
       
        
    }
    async deleteAdmin (req, res) {
        try {
            const {id} = req.params
            if(!id || id == 1){
                throw new Error()
            }
            await User.destroy({where:{id}})
            res.json({result:true})
        } catch (e) {
            res.status(500).json({error:"При видаленні виникла помилка"})
        }
    }
}

module.exports = new UserController()