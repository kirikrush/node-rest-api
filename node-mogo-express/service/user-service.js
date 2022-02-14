const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const MailService = require('../service/mail-service');
const TokenService = require('../service/token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({email})
        console.log(candidate)
        if (candidate) {
            throw ApiError.BadRequest( `Пользователь с почтой ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 7)
        const activationLink = uuid.v4();
        const user = await UserModel.create({email, password: hashPassword, activationLink})
        await MailService.sendActivationMail(email, `http://localhost:3080/api/activate/${activationLink}`)
        const payload = new UserDto(user);
        const tokens = TokenService.generateTokens({...payload})
        await TokenService.saveToken(payload.id, tokens.refreshToken)

        return {
            ...tokens,
            user: payload
        }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink});
        console.log(user)
        if (!user) {
            throw ApiError.BadRequest('Invalid link')
        }
        user.isActive = true;
        await user.save()

    }

    async login(email, password) {
        const user = await UserModel.findOne({email, isActive: true})
        const validPassword = bcrypt.compareSync(password, user.password);
        console.log(validPassword)
        if (!user || !validPassword) {
            throw ApiError.BadRequest( 'Bad credentials')
        }
        const payload = new UserDto(user);
        const tokens = TokenService.generateTokens({...payload})
        await TokenService.saveToken(payload.id, tokens.refreshToken)

        return {
            ...tokens,
            user: payload
        }
    }
}

module.exports = new UserService();