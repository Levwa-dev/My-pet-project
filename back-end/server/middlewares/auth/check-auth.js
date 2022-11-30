const TokenService = require('../../services/token-service')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS'){
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] 
        if(!token) { // Відсутній токен авторизації
            return res.status(401).send({error:"Не авторізований"})
        }
        const decoded = TokenService.accessTokenVerify(token)
        if(!decoded) { // Якщо час дії токена закінчився
            return res.redirect('/auth/refresh')
        }
        req.user = decoded
        next()
    } catch (e) {
       return res.status(401).send({error:"Не авторізований"})
    }
}