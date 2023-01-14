const TokenService = require('../../services/token-service')

module.exports = async (req, res, next) => {
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
       
        if(!decoded || !tokenFromDb){
            return res.status(401).send({error:"Не авторізований"})
        }
        req.user = decoded
        next()
    } catch (e) {
       return res.status(401).send({error:"Не авторізований"})
    }
}