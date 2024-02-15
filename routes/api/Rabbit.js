const express = require('express');
const rabbitController = require('../../controllers/rabbit-controller');
const schema = require('../../schemas/Rabbits');
const { validateBody } = require('../../decorators');
const { isValidId, authenticate } = require('../../middlewares');
const router = express.Router();

router.use(authenticate);

router.get('/', rabbitController.getAllRabbits);
// get all breeds
router.get('/breeds', rabbitController.getAllRabbitsBreed);
// add breed in base
router.post('/breeds/add', validateBody(schema.rabbitBreedSchema), rabbitController.addRabbitBreed);

// router.get('/breeds/add', validateBody(schema.rabbitBreedSchema), rabbitController.addRabbitBreed);
// find breed rabbits by id
router.get('/breeds/:breedId', rabbitController.getRabbitBreedById);
// update breed rabbits
router.put('/breeds/:breedId', isValidId, validateBody(schema.rabbitBreedSchema), rabbitController.updateRabbitBreed);
// delete breed rabbits
router.delete('/breeds/:breedId', rabbitController.deleteRabbitBreed);

router.get(
  '/:rabbitId',
  // , isValidId,
  rabbitController.getRabbitById
);

router.post('/add', validateBody(schema.rabbitSchema), rabbitController.addRabbit);

// router.put('/:rabbitId', isValidId, validateBody(schema.rabbitSchema), rabbitController.updateRabbit);
// router.patch(
//   '/:rabbitId/favorite',
//   isValidId,
//   validateBody(schema.contactsUpdateFavoriteSchema),
//   rabbitController.updateRabbitFavorite
// );
router.delete(
  '/:rabbitId',
  // isValidId,
  rabbitController.deleteRabbit
);

module.exports = router;
