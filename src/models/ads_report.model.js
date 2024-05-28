const mongoose = require('mongoose');

const adsReportSchema = new mongoose.Schema({
  // user triggered the report creation
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // this is the report name when calling amazon api
  reportName: {
    type: String,
    required: true,
  },
  // the is the report date range start date
  startDate: {
    type: Date,
    required: true,
  },
  // the is the report date range end date
  endDate: {
    type: Date,
    required: true,
  },
  // this is the report id reference from amazon api
  reportId: {
    type: String,
    required: true,
  },
  // this is the report gzip s3 url (get using report status url field in amazon api)
  reportGzipS3Url: {
    type: String,
    required: false,
  },
  // this is the spredsheet id when we read the json file in the gzip and generate this spreadsheet
  downloadedSpreadsheetId: {
    type: String,
    required: true,
  },
  // this is the spredsheet url tied to downloadedSpreadsheetId
  downloadedSpreadsheetUrl: {
    type: String,
    required: true,
  },
  // this is the spreadsheet id after we copy the report data and generate this spreadsheet for upload to amazon api
  uploadedSpreadsheetId: {
    type: String,
    required: true,
  },
  // this is the spredsheet url tied to uploadedSpreadsheetId
  uploadedSpreadsheetUrl: {
    type: String,
    required: true,
  },
  // status of the report creation process
  // * Report-Pending - report is created via amazon api and status Pending in amazon
  // * Report-Completed - report is completed in amazon api and report gzip file s3 url is available
  // * Creating-Donwload-Spreadsheet - creating the download spreadsheet
  // * Creating-Upload-Spreadsheet - creating the spreadsheet to upload 
  // * Processing - processing the gzip file now
  // * Uploading-Excel - uploading processed excel file to amazon api
  // * Completed - completed the processing of gzip file and
  // * Failed -
  status: {
    type: String,
    enum: ['Report-Pending', 'Report-Completed', 'Processing', 'Completed', 'Failed'],
    default: 'Report-Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// update the 'updatedAt' field before saving the document
userSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const AdsReport = mongoose.model('AdsReport', adsReportSchema);

module.exports = AdsReport;
