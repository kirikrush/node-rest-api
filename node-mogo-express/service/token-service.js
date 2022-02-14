const jwt = require('jsonwebtoken');
const TokenModel = require('../models/token-model')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {accessToken, refreshToken}
    }

    async saveToken(userId, token) {
        const tokenData = await TokenModel.findOne({user: userId});
        if (tokenData) {
            tokenData.refreshToken = token;
            console.log(tokenData)
            return tokenData.save();
        }
        console.log(token)
        const newToken = await TokenModel.create({user:userId, refreshToken: token})
        return token;
    }
}

module.exports = new TokenService();