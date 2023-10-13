const express = require('express');
const rabbitController = require('../../controllers/rabbit-controller');
const schema = require('../../schemas/Rabbits');
const { validateBody } = require('../../decorators');
const { isValidId, authenticate } = require('../../middlewares');
const router = express.Router();

router.use(authenticate);

router.get('/', rabbitController.getAllRabbits);

router.get('/:contactId', isValidId, rabbitController.getRabbitById);

router.post('/', validateBody(schema.rabbitSchema), rabbitController.addRabbit);

router.put('/:contactId', isValidId, validateBody(schema.rabbitSchema), rabbitController.updateRabbit);
router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(schema.contactsUpdateFavoriteSchema),
  rabbitController.updateRabbitFavorite
);
router.delete('/:contactId', isValidId, rabbitController.deleteRabbit);

module.exports = router;
