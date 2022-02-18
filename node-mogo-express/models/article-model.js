const {Schema, model} = require('mongoose');

const ArticleSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    isPublished: {type: "Boolean", default: false, required: true},
    img: {type: 'String', default: 'https://ya.ru', required: true},
    dateOfCreation: {type: "Date", required: true},
    content: {type: "String", required: true},
    alias: {type: "String", unique: true, required: true}
})

module.exports = model('Article', ArticleSchema)