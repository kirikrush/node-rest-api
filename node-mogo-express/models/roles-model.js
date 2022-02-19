const {Schema, model} = require('mongoose');

const RolesSchema = new Schema({
    alias: {type: 'String', unique: true, required: true}
})

const RolesModel = model('Roles', RolesSchema);
module.exports = RolesModel;