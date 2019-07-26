var express = require('express');
var router = express.Router();
var rubricController = require('../controllers/rubricController.js');

/*
 * GET
 */
router.get('/:user_id', rubricController.list);

/*
 * GET
 */
router.get('/:id', rubricController.show);

/*
 * POST
 */
router.post('/', rubricController.create);

/*
 * PUT
 */
router.put('/:id', rubricController.update);

/*
 * DELETE
 */
router.delete('/:id', rubricController.remove);

module.exports = router;
