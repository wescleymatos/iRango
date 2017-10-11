const express = require('express');
const router = express.Router();
const controller = require('../controllers/restaurante-controller');

router.get('/restaurants', controller.get);
router.post('/restaurants', controller.post);
router.delete('/restaurants/:id', controller.delete);

module.exports = router;
