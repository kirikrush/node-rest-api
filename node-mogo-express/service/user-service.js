const UserModel = require('../models/user-model');
const RolesModel = require('../models/roles-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const MailService = require('../service/mail-service');
const TokenService = require('../service/token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({email})
        // console.log(candidate)
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтой ${email} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 7)
        const activationLink = uuid.v4();
        const userRole = await RolesModel.findOne({alias: 'USER'});
        const user = await UserModel.create({email, password: hashPassword, activationLink, role: userRole.id})
        await MailService.sendActivationMail(email, `http://localhost:3080/api/activate/${activationLink}`)
        const role = await RolesModel.findById(user.role);
        const payload = new UserDto(user, role.alias);
        const tokens = TokenService.generateTokens({...payload})
        await TokenService.saveToken(payload.id, tokens.refreshToken)
        console.log(user, role)
        return {
            ...tokens,
            user:{...payload}
        }
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink});
        // console.log(user)
        if (!user) {
            throw ApiError.BadRequest('Invalid link')
        }
        user.isActive = true;
        await user.save()

    }

    async user(id, withRole = false) {
        const user = await UserModel.findById(id);
        if (!user) {
            return null
        }
        let role = false;
        if (withRole) {
            const userRole = await RolesModel.findById(user.role)
            role = userRole.alias
        }
        const userData = new UserDto(user, role);
        return {...userData}
    }

    async login(email, password) {
        const user = await UserModel.findOne({email, isActive: true})
        if (!user) {
            throw ApiError.BadRequest('Not existing user')
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!user || !validPassword) {
            throw ApiError.BadRequest('Bad credentials')
        }
        const role = await RolesModel.findById(user.role);
        const payload = new UserDto(user, role.alias);
        const tokens = TokenService.generateTokens({...payload})
        await TokenService.saveToken(payload.id, tokens.refreshToken)

        return {
            ...tokens,
            user: payload
        }
    }
}

module.exports = new UserService();