const RolesModel = require('../models/roles-model')

module.exports = async () => {
    const roles = await RolesModel.findOne();
    if (!roles) {
        RolesModel.insertMany([{alias: 'ADMIN'}, {alias: 'CREATOR'}, {alias: 'MODERATOR'}, {alias:'USER'}])
    }
    return true
}