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

router.get('/s2/:id', citationController.s2);

/*
 * POST
 */
router.post('/', citationController.create);

/*
 * PUT
 */
router.put('/:id', citationController.update);

/*
 * DELETE
 */
router.delete('/:id', citationController.remove);

module.exports = router;
