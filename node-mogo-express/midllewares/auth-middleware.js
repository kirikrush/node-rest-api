const ApiError = require('../exceptions/api-error');
const jwt = require('jsonwebtoken');
const TokenService = require('../service/token-service');
const UserModel = require('../models/user-model')
module.exports = async (req, res, next) => {
    // console.log(req.body, req.query, req.params)
    try {
        const auth = req.headers?.authorization;
        if (!auth) {
            throw ApiError.UnauthorizedError();
        }
        const token = auth.split(' ')[1];
        if (!token) {
            throw  ApiError.UnauthorizedError();
        }
        const userData = TokenService.validateAccessToken(token)
        if(!userData){
            throw ApiError.UnauthorizedError();
        }
        req.user = userData;
        next()
    } catch (e) {
        return next(e)
    }
}