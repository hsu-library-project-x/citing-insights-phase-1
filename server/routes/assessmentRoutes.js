let express = require('express');
let router = express.Router();
let assessmentController = require('../controllers/assessmentController');

/*
 * GET
 */
router.get('/:user_id/:citation_id/:rubric_id/:rubric_card_index/:annotation', assessmentController.create);


module.exports = router;