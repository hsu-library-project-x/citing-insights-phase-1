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
router.get('/get_groups/:id', assignmentController.get_groups);

router.get('/by_user_id/:id', assignmentController.by_user_id);

router.get('/by_class_id/:id', assignmentController.by_class_id);

router.get('by_group_id/:id/:group_id', assignmentController.by_group_id);


/*
 * POST
 */
router.post('/:user_id', assignmentController.create);

/*
 * PUT
 */
router.put('/update/:id', assignmentController.update);
router.put('/remove/:id', assignmentController.removeGroup);



/*
 * DELETE
 */
router.delete('/:id', assignmentController.remove);

module.exports = router;
