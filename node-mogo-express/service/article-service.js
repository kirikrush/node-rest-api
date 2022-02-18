const ArticleModel = require('../models/article-model')
const ApiError = require('../exceptions/api-error')
const ArticleDto = require('../dtos/article-dto')

class ArticleService {
    async createArticle(user, content, img, alias, published) {
        const articleData = await ArticleModel.findOne({alias})
        if (articleData) {
            throw ApiError.PostIsExist()
        }
        const newArticle = await ArticleModel.create({
            user: user.id,
            content,
            img,
            alias,
            published,
            dateOfCreation: new Date()
        })
        const payload = new ArticleDto(newArticle);
        return {...payload}
    }

    async deleteArticle(id) {
        const articleData = await ArticleModel.findOne({id})
        if (!articleData) {
            throw ApiError.BadRequest('Post is not exist')
        }
        const deleteResult = await ArticleModel.deleteOne({id})
        return deleteResult ? true : false
    }
}

module.exports = new ArticleService()