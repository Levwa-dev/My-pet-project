const {Token} = require('../../sequelize/models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class TokenService {

    generateJWT (data) { // Генеруємо JWT TOKEN
        const access = jwt.sign(data, process.env.JWT_ACCESS_KEY, {expiresIn:'30m'})
        const refresh = jwt.sign(data, process.env.JWT_REFRESH_KEY, {expiresIn:'30d'})
        return {access, refresh}
    }

    refreshTokenVerify(token) { // Перевірка ркфреш токену
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_KEY)
        } catch (e) {
            return null
        }
    }
    
    accessTokenVerify(token) { // Перевірка аксес токену
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_KEY)
        } catch (error) {
            return null 
        }
    }

    async saveToken (userId, token) { // Функція збереження токену до БД
        const oldToken = await Token.findOne({where:{userId}})
        oldToken ?
            await Token.update({token}, {where:{userId}}) 
            :
            await Token.create({userId, token})
    }
    
    async findTokenfromDb(refreshToken) { // Отримання рефреш токену з БД
       return await Token.findOne({where:{token:refreshToken}})  
    }

    async removeTokenFromDb(refreshToken) { // Видалення рефреш токену з БД
        await Token.destroy({where:{token:refreshToken}})
    }

    async generateJWTAndSaveToDb (data) { // Згенерувати токени, завантажити рефреш токен до БД, та повернути токени до контролера
        const tokens = this.generateJWT(data)
        await this.saveToken(data.id, tokens.refresh)
        return tokens
    }

}

module.exports = new TokenService()
