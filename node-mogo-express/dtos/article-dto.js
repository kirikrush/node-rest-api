const {Schema} = require("mongoose");
module.exports = class ArticleDto {
    user;
    isPublished;
    img;
    dateOfCreation;
    content;
    alias;
    id;
    constructor(model) {
        this.user = model.user;
        this.isPublished = model.isPublished;
        this.img = model.img;
        this.dateOfCreation = model.dateOfCreation;
        this.content = model.content;
        this.alias = model.alias;
        this.id = model._id;
    }
}