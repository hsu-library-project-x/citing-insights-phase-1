var express = require('express');
var router = express.Router();
var feedbackController = require('../controllers/feedbackController.js');

/*
 * GET
 */
router.get('/', feedbackController.list);

/*
 * GET
 */
router.get('/:id', feedbackController.show);

/*
 * POST
 */
router.post('/', feedbackController.create);

/*
 * PUT
 */
router.put('/:id', feedbackController.update);

/*
 * DELETE
 */
router.delete('/:id', feedbackController.remove);

module.exports = router;
