const ArticleService = require('../service/article-service')
const {validationResult} = require("express-validator");
const ApiError = require('../exceptions/api-error');

class ArticleController {
    async create(req, res, next) {
        try {
            const {alias, content, img, isPublished = false} = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw ApiError.BadRequest('Ошибка при валидации', errors.array())
            }
            const user = req.user;
            const article = await ArticleService.createArticle(user, alias, content, img, isPublished)
            return res.status(200).json(article)
        } catch (e) {
            console.log('im heree')
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.body;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw ApiError.BadRequest('Ошибка при валидации', errors.array())
            }
            const deletion = await ArticleService.deleteArticle(id);
            if(deletion) {
                return res.status(204).json({})
            }
            else{
                throw ApiError.BadRequest('Ебать', errors.array())
            }
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ArticleController()