const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isActive: {type: Boolean, required: true, default: false},
    activationLink: {type: String}
})

module.exports = model('User', UserSchema)