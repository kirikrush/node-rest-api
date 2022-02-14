const Router = require('express').Router;
const router = new Router();
const userController = require('../Controllers/user-controller');
const {query} = require('express-validator')
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
router.get('/users', userController.getUsers);

module.exports = router;