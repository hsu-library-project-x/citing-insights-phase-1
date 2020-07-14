var express = require('express');
var router = express.Router();
var rubricController = require('../controllers/rubricController.js');

// get ALL rubrics
router.get('/', rubricController.all);

/*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
 * GET
 */
router.get('/:user_id', rubricController.list);

/*
 * GET
 */
router.get('/:id', rubricController.show);

router.get('/by_email/:email', rubricController.sharedRubrics);

/*
 * POST
 */
router.post('/', rubricController.create);

/*
 * PUT
 */
router.put('/:id', rubricController.update);

router.put('/updateGroup/:id', rubricController.updateGroup);


/*
 * DELETE
 */
router.delete('/:id', rubricController.remove);

module.exports = router;
