var express = require('express');
var router = express.Router();
var paperController = require('../controllers/paperController.js');

/*
 * GET
 */
router.get('/', paperController.list);

/*
 * GET
 */
router.get('/:id', paperController.show);

/*
 * POST
 */
router.post('/', paperController.create);

/*
 * PUT
 */
router.put('/:id', paperController.update);

/*
 * DELETE
 */
router.delete('/:id', paperController.remove);

module.exports = router;
