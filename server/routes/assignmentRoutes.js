var express = require('express');
var router = express.Router();
var assignmentController = require('../controllers/assignmentController.js');

/*
 * GET
 */
router.get('/', assignmentController.list);

/*
 * GET
 */
router.get('/:id', assignmentController.show);

/*
 * POST
 */
router.post('/', assignmentController.create);

/*
 * PUT
 */
router.put('/:id', assignmentController.update);

/*
 * DELETE
 */
router.delete('/:id', assignmentController.remove);

module.exports = router;
