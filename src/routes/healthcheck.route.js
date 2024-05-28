const express = require('express');
const router = express.Router();
const healthcheckController = require('../controllers/healthcheck.controller');

router.get('/', healthcheckController.healthcheck);
router.get('/ready', healthcheckController.healthcheckReady);
router.get('/live', healthcheckController.healthcheckLive);

module.exports = router;
