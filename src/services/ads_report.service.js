const Logger = require("../utils/logger");
const path = require('path');
const fileService = require('../services/file.service');

class AdsReportService {
  /**
   * Create new ads report
   * @param {*} newAdsReport 
   */
  static async createAdsReport(newAdsReport) {
    try {
      // create the report calling amazon ads api
      // - check the response of the API, it should be status PENDING

      // save created ads report details in database for reference
      // - data will be call in processAdsReport method which is being triggered every 10mins by cron to check the report status if COMPLETED
    } catch (error) {
      Logger.error(
        'Error encountered [AdsReportService] createAdsReport function',
        error
      );
      throw error;
    }
  }

  /**
   * This method is triggered by cron job to check if report created using amazon ads API with status PENDING is already completed
   */
  static async processAdsReport() {
    try {
      // create the report calling amazon ads api
      //  - extract the data into excel file
      const inputGzipPath = path.join(__dirname, 'report-sample.json.gz');
      const outputFilePath = path.join(__dirname, 'report-sample.json');
      fileService.extractGzip(inputGzipPath, outputFilePath);

      // call google spreadsheet api to create a new spreadsheet with data from report (downloaded spreadsheet)
      // - note the spreadsheet id, spreadsheet url, and the email addresses to share the spreadsheet

      // - call gs api to copy the templated spreadsheet id and create new spreadsheet with the data from downloaded spreadsheet (uploaded spreadsheet)
      // - note the spreadsheet id, spreadsheet url, and the email addresses to share the spreadsheet

      // call amazon ads api to upload (uploaded spreadsheet)
    } catch (error) {
      Logger.error(
        'Error encountered [AdsReportService] processAdsReport function',
        error
      );
      throw error;
    }
  }

  static async getAdsReportById(id) {
    try {
    } catch (error) {
      Logger.error(
        'Error encountered [AdsReportService] getAdsReportById function',
        error
      );
      throw error;
    }
  }

  static async getAllAdsReports(filter) {
    try {
    } catch (error) {
      Logger.error(
        'Error encountered [AdsReportService] getAllAdsReports function',
        error
      );
      throw error;
    }
  }
}

module.exports = AdsReportService;