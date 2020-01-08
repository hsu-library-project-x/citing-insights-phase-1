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

router.get('/by_user_id/:id', assignmentController.by_user_id);
router.get('/by_class_id/:id', assignmentController.by_class_id);

/*
 * POST
 */
router.post('/:user_id', assignmentController.create);

/*
 * PUT
 */
router.put('/:id', assignmentController.update);

/*
 * DELETE
 */
router.delete('/:id', assignmentController.remove);

module.exports = router;
