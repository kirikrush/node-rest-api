const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isActive: {type: Boolean, required: true, default: false},
    activationLink: {type: String},
    role: {type: Schema.Types.ObjectId, ref: "Roles", required: true}
})

module.exports = model('User', UserSchema)