const {User} = require('../../sequelize/models')
const bcrypt = require('bcrypt')

const TokenService = require('../services/token-service')

class AuthController {

    async registration (req, res) {
        try {
            const {email, password} = req.body
            if(!email || !password) {
                return res.status(500).json({error:"Відстуні пароль, або пошта"})
            }
            const user = await User.findOne({where:{id:1}})
            if(user){
                return res.status(500).json({error:'Головний запис адміністратора вже доданий'})
            }
            const hashPassword = bcrypt.hashSync(password, 10)
            const newUser = await User.create({...req.body, password:hashPassword, isAdmin:true})
            const {id, name, isAdmin} = newUser
            const {access, refresh} = await TokenService.generateJWTAndSaveToDb({id, name, isAdmin})
            res.cookie('refreshToken', refresh, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly:true})
            res.json({id, name, isAdmin, token:access})
        } catch (e) {
            res.status(500).json({error:'При реїстрація сталася помилка'})
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body
            if(!email || !password) { 
                return res.json({error:'Відстуній пароль, або email'})
            }
            const user = await User.findOne({where:{email}})
            if(!user){
                return res.json({error:'Такого користувача не існує'})
            }
            const isValidPassword = await bcrypt.compare(password, user.password)
            if(!isValidPassword){
                return res.json({error:'Невірний пароль'})
            }
            const {id, name, isAdmin} = user
            const {access, refresh} = await TokenService.generateJWTAndSaveToDb({id, name, isAdmin})
            res.cookie('refreshToken', refresh, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly:true})
            res.json({id, name, isAdmin, token:access})
        } catch (e) {
            res.status(500).json({error:'При авторизації сталася помилка'})
        }
       
    }

    async logout(req, res) {
        try {
            const {refreshToken} = req.cookies
            await TokenService.removeTokenFromDb(refreshToken)
            res.clearCookie('refreshToken')
            res.status(200).json({result:true})
        } catch (e) {
            res.status(500).json({error:'Помилка авторизації'})
        }
       
    }

    async refresh(req, res) {
        try {
            const {refreshToken} = req.cookies
            const tokenFromDb = await TokenService.findTokenfromDb(refreshToken)
            const userData = TokenService.refreshTokenVerify(refreshToken)
            if(!refreshToken || !tokenFromDb || !userData){
                return res.status(401).json({error:'Час вашої сесії вичерпано, авторизуйтесь знову'})
            }
            const {id, name, isAdmin} = await User.findOne({where:{id:userData.id}})
            const tokens = TokenService.generateJWT({id, name, isAdmin})
            return res.json({id, name, isAdmin, token:tokens.access})
        } catch (e) {
            return res.status(401).json({error:'Час вашої сесії вичерпано, авторизуйтесь знову'})
        }
    }
}

module.exports = new AuthController()