const express = require('express');
const feedsController = require('../../controllers/feeds-controller');
const schema = require('../../schemas/Feeds');
const { validateBody } = require('../../decorators');
const { authenticate } = require('../../middlewares');
// const {  authenticate } = require('../../middlewares');
const router = express.Router();

router.use(authenticate);

// add feed in base
router.post('/add', validateBody(schema.FeedsSchema), feedsController.addFeed);

// get all feed list
router.get('/', feedsController.getAllFeeds);

// find feeds by id
router.get('/:feedsId', feedsController.getFeedById);

// update feeds
router.put('/:feedsId',  validateBody(schema.FeedsSchema), feedsController.updateFeed);

// delete feeds
router.delete('/delete/:feedId', feedsController.deleteFeed);

module.exports = router;
