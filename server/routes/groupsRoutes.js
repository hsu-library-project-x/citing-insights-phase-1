var express = require('express');
var router = express.Router();
var groupsController = require('../controllers/groupsController.js');

/*
 * GET
 */
router.get('/', groupsController.list);

/*
 * GET
 */
router.get('/:id', groupsController.show);

/*
 * POST
 */
router.post('/', groupsController.create);

/*
 * PUT
 */
router.put('/:id', groupsController.update);

/*
 * DELETE
 */
router.delete('/:id', groupsController.remove);

module.exports = router;
