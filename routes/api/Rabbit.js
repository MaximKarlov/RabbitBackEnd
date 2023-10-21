const express = require('express');
const rabbitController = require('../../controllers/rabbit-controller');
const schema = require('../../schemas/Rabbits');
const { validateBody } = require('../../decorators');
const { isValidId, authenticate } = require('../../middlewares');
const router = express.Router();

router.use(authenticate);

router.get('/', rabbitController.getAllRabbits);

router.get('/breeds', rabbitController.getAllRabbitsBreed);
router.post('/breeds/add', validateBody(schema.rabbitBreedSchema), rabbitController.addRabbitBreed);

router.get(
  '/:rabbitId',
  // , isValidId,
  rabbitController.getRabbitById
);

router.post('/add', validateBody(schema.rabbitSchema), rabbitController.addRabbit);

router.put('/:rabbitId', isValidId, validateBody(schema.rabbitSchema), rabbitController.updateRabbit);
router.patch(
  '/:rabbitId/favorite',
  isValidId,
  validateBody(schema.contactsUpdateFavoriteSchema),
  rabbitController.updateRabbitFavorite
);
router.delete('/:rabbitId', isValidId, rabbitController.deleteRabbit);

module.exports = router;
