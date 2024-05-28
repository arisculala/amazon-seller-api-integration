const express = require('express');
const router = express.Router();
const {
  validateRequest
} = require('../middlewares/validator.middleware');
const adsReportController = require('../controllers/ads_report.controller');
const { createAdsReportSchema } = require('../resources/ads_report.resource');

router.post(
  '/',
  validateRequest({ bodySchema: createAdsReportSchema }),
  adsReportController.createAdsReport
);

router.get('/', adsReportController.getAllAdsReports);

router.get('/:id', adsReportController.getAdsReportById);

module.exports = router;
