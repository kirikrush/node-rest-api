const Router = require('express').Router;
const router = new Router();
const userController = require('../Controllers/user-controller');
const authMiddleware = require('../midllewares/auth-middleware');
const articleController = require('../Controllers/article-controller');
const {query} = require('express-validator');
const {body} = require('express-validator');
router.post('/registration',
    query('email').isEmail(),
    query('password').isLength({min: 8, max: 16}),
    userController.registration
)
;
router.post('/login',
    query('email').isEmail(),
    query('password').isLength({min: 8, max: 16}),
    userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', authMiddleware, userController.getUsers);
router.post('/post',
    authMiddleware,
    body(['alias', 'img', 'content']).not().isEmpty(),
    articleController.create)
router.delete('/post',
    authMiddleware,
    body('id').not().isEmpty(),
    articleController.delete)

module.exports = router;