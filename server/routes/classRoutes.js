var express = require('express');
var router = express.Router();
var classController = require('../controllers/classController.js');

/*
 * GET
 */
router.get('/', classController.list);

/*
 * GET
 */
router.get('/:id', classController.show);

/*
 * POST
 */
router.post('/', classController.create);

/*
 * PUT
 */
router.put('/:id', classController.update);

/*
 * DELETE
 */
router.delete('/:id', classController.remove);

module.exports = router;
