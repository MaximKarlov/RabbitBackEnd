const express = require('express');
const feedsController = require('../../controllers/feeds-controller');
const schema = require('../../schemas/Feeds');
const { validateBody } = require('../../decorators');
// const { isValidId, authenticate } = require('../../middlewares');
const {  authenticate } = require('../../middlewares');
const router = express.Router();

router.use(authenticate);
// add feed in base
router.post('/add', validateBody(schema.FeedsSchema), feedsController.addFeed);
// get all feed list
router.get('/', feedsController.getAllFeeds);
// get all breeds
// router.get('/breeds', feedsController.getAllRabbitsBreed);
// // add breed in base
// router.post('/breeds/add', validateBody(schema.rabbitBreedSchema), feedsController.addRabbitBreed);

// // router.get('/breeds/add', validateBody(schema.rabbitBreedSchema), rabbitController.addRabbitBreed);
// // find breed rabbits by id
// router.get('/breeds/:breedId', feedsController.getRabbitBreedById);
// // update breed rabbits
// router.put('/breeds/:breedId', isValidId, validateBody(schema.rabbitBreedSchema), feedsController.updateRabbitBreed);
// delete Feed 
router.delete('/delete/:feedId', feedsController.deleteFeed);

// router.get(
//   '/:rabbitId',
//   // , isValidId,
//   feedsController.getRabbitById
// );

// router.put('/:rabbitId', isValidId, validateBody(schema.rabbitSchema), feedsController.updateRabbit);
// router.patch(
//   '/:rabbitId/favorite',
//   isValidId,
//   validateBody(schema.contactsUpdateFavoriteSchema),
//   feedsController.updateRabbitFavorite
// );
// router.delete(
//   '/:rabbitId',
//   // isValidId,
//   feedsController.deleteRabbit
// );

module.exports = router;
