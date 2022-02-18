module.exports = class ArticleDto {
    id;
    alias;
    constructor(model) {
        this.alias = model.alias;
        this.id = model._id;
    }
}