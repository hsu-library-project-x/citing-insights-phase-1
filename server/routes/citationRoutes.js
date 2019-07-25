var express = require('express');
var router = express.Router();
var citationController = require('../controllers/citationController.js');

/*
 * GET
 */
router.get('/', citationController.list);

/*
 * GET
 */
router.get('/:id', citationController.show);

/*
 * POST
 */
router.post('/', citationController.create);

/*
 * PUT
 */
router.put('/:id', citationController.update);

//Route for adding rubric scores to a specific citation
router.put('/add_rubric_score/:id', citationController.update);

//Route for adding intext citations to an existing citation
router.put('/add_intext_citations/:id', citationController.update);

/*
 * DELETE
 */
router.delete('/:id', citationController.remove);

module.exports = router;
