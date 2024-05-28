const { HttpStatusCode } = require('../utils/httpstatus');
const ControllerErrorHandler = require('../utils/controller_error_handler');
const adsReportService = require('../services/ads_report.service');
const { UserErrorCode } = require('../resources/user.resource');
const StandardError = require('../utils/standard_error');

class AdsReportController {
  static async createAdsReport(req, res) {
    try {
      const adsReport = await adsReportService.createAdsReport(req.body);
      res.status(HttpStatusCode.Created).send(adsReport);
    } catch (error) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }

  static async getAllAdsReports(req, res) {
    try {
      const adsReports = await adsReportService.getAllAdsReports();
      res.send(adsReports);
    } catch (error) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }

  static async getAdsReportById(req, res) {
    try {
      const adsReport = await adsReportService.getAdsReportById(req.params.id);
      res.send(adsReport);
    } catch (error) {
      ControllerErrorHandler.handleErrorResponse(res, error);
    }
  }
}

module.exports = AdsReportController;
