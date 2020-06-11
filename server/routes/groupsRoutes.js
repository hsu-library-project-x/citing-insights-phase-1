var express = require('express');
var router = express.Router();
var groupsController = require('../controllers/groupsController.js');

/*
 * GET
 */
router.get('/', groupsController.list);

/*
 * GET
 */
router.get('/findOwner/:id', groupsController.findOwner);


/*
 * GET
 */
router.get('/:id', groupsController.show);

/*
 * POST
 */
router.post('/', groupsController.create);

/*
 * PUT
 */
router.put('/pending', groupsController.update);


/*
 * PUT
 */
router.put('/pendingAdd/', groupsController.pendingAdd);

/*
 * PUT
 */
router.put('/pendingReject/', groupsController.pendingReject);

/*
 * DELETE
 */
router.delete('/:id', groupsController.remove);

module.exports = router;
