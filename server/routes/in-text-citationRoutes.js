var express = require('express');
var router = express.Router();
var in-text-citationController = require('../controllers/in-text-citationController.js');

/*
 * GET
 */
router.get('/', in-text-citationController.list);

/*
 * GET
 */
router.get('/:id', in-text-citationController.show);

/*
 * POST
 */
router.post('/', in-text-citationController.create);

/*
 * PUT
 */
router.put('/:id', in-text-citationController.update);

/*
 * DELETE
 */
router.delete('/:id', in-text-citationController.remove);

module.exports = router;
