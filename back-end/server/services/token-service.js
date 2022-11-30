const {Token} = require('../../sequelize/models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

class TokenService {

    generateJWT (data) {
        const access = jwt.sign(data, process.env.JWT_ACCESS_KEY, {expiresIn:'30m'})
        const refresh = jwt.sign(data, process.env.JWT_REFRESH_KEY, {expiresIn:'30d'})
        return {access, refresh}
    }

    refreshTokenVerify(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_KEY)
        } catch (e) {
            return null
        }
    }
    
    accessTokenVerify(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_KEY)
        } catch (error) {
            return null 
        }
    }

    async saveToken (userId, token) {
        const oldToken = await Token.findOne({where:{userId}})
        oldToken ?
            await Token.update({token}, {where:{userId}}) :
            await Token.create({userId, token})
    }
    
    async findTokenfromDb(refreshToken) {
       return await Token.findOne({where:{token:refreshToken}})  
    }

    async removeTokenFromDb(refreshToken) {
        await Token.destroy({where:{token:refreshToken}})
    }

    async generateJWTAndSaveToDb (data) {
        const tokens = this.generateJWT(data)
        await this.saveToken(data.id, tokens.refresh)
        return tokens
    }

}

module.exports = new TokenService()
