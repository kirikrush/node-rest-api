const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token-model')
const ApiError = require('../exceptions/api-error')
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30d'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {accessToken, refreshToken}
    }

    async saveToken(userId, token) {
        const tokenData = await TokenModel.findOne({user: userId});
        if (tokenData) {
            tokenData.refreshToken = token;
            // console.log(tokenData)
            return tokenData.save();
        }
        // console.log(token)
        const newToken = await TokenModel.create({user:userId, refreshToken: token})
        return token;
    }

    validateAccessToken (token) {
        try {
            const tokenData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return tokenData;
        }
        catch(e){
            return null;
        }
    }
}

module.exports = new TokenService();