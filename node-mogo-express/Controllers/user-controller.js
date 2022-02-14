const UserService = require('../service/user-service')
const TokenService = require('../service/token-service');
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-error')

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password} = req.query;
            const userData = await UserService.registration(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
               return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password} = req.query;
            const userData = await UserService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async activate(req, res, next) {
        console.log(req.params)
        try {
            const activationLink = req.params.link;
            await UserService.activate(activationLink);
            return res.status(200).json({message: 'activated'})
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {

        } catch (e) {

        }
    }

    async getUsers(req, res, next) {
        try {
            res.json(['123', '1234'])
        } catch (e) {

        }
    }
}

module.exports = new UserController();