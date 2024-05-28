const Joi = require('joi');

const AdsReportErrorCode = {
  CREATE_NEW_ADS_REPORT_ERROR: 'CREATE_NEW_ADS_REPORT_ERROR',
  ADS_REPORT_NOT_FOUND_ERROR: 'ADS_REPORT_NOT_FOUND_ERROR',
  GET_ADS_REPORTS_ERROR: 'GET_ADS_REPORTS_ERROR'
};

const adsReportSchema = Joi.object({
  id: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  deleted: Joi.boolean().required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required()
});

const createAdsReportSchema = Joi.object({
  reportName: Joi.string().required(),
  startDate: Joi.string().required(), // format: YYYY-MM-DD
  endDate: Joi.string().required(), // format: YYYY-MM-DD
});

const getAdsReportsFilterSchema = Joi.object({
  limit: Joi.number().required(),
  // firstName: Joi.string().required(),
  // lastName: Joi.string().required(),
  // email: Joi.string().email().required()
});

module.exports = {
  AdsReportErrorCode,
  adsReportSchema,
  createAdsReportSchema,
  getAdsReportsFilterSchema
};
