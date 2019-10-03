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

router.get('/by_paper_id/:id', citationController.by_paper_id);

router.get('/s2/:id', citationController.s2);

router.get('/save_citation_grade/:id/:rubricId/:grade/:annotation', citationController.save_citation_grade);

router.get('/:user_id', citationController.by_user_id);

router.get('/find_evaluations/:paper_id', citationController.find_evaluations);

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

//Route for adding annotations to a citation
router.put('/add_annotation/:id', citationController.update);

/*
 * DELETE
 */
router.delete('/:id', citationController.remove);

module.exports = router;
