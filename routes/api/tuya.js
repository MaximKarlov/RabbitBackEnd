const express = require('express');
const tuyaController = require('../../controllers/tuya-controller');
// const schema = require('../../schemas/Rabbits');
// const { validateBody } = require('../../decorators');
// const { isValidId, authenticate } = require('../../middlewares');
const router = express.Router();


router.get('/getToken', tuyaController.getToken);

module.exports = router;
