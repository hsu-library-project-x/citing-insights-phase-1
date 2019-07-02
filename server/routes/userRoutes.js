var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');

/*
 * GET
 */
router.get('/', userController.list);

/*
 * GET
 */
router.get('/:id', userController.show);

/*
 * POST - create new user
 */
router.post('/register', userController.create);

// POST - login
router.post('/login', userController.login);

/*
 * PUT
 */
router.put('/:id', userController.update);

/*
 * DELETE
 */
router.delete('/:id', userController.remove);

module.exports = router;
