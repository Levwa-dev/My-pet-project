const TokenService = require('../../services/token-service')

module.exports = async (req, res, next) => { // Проміжнє ПЗ для перевірки авторизаціїї користувача
    if (req.method === 'OPTIONS'){
        next()
    }
    try {
        const {refreshToken} = req.cookies
        const tokenFromDb = await TokenService.findTokenfromDb(refreshToken)
        const token = req.headers.authorization.split(' ')[1]
        if(!token) { // Відсутній токен авторизації
            return res.status(401).send({error:"Не авторізований"})
        }
        const decoded = TokenService.accessTokenVerify(token)
       
        if(!decoded || !tokenFromDb){ // Токен не валідний, або відсутній рефреш токен
            return res.status(401).send({error:"Не авторізований"})
        }
        req.user = decoded
        next()
    } catch (e) {
       return res.status(401).send({error:"Не авторізований"})
    }
}