const { google } = require('googleapis');
const path = require('path');
const Logger = require('../../utils/logger');

class GoogleSpreadsheetApiManager {
  constructor() {
    // create an authorized client
    this.auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, 'google_service_account.json'),
      scopes: [
        'https://www.googleapis.com/auth/spreadsheets',
        'https://www.googleapis.com/auth/drive'
      ]
    });
  }

  /**
   * Create new google spreadsheet
   * @returns
   *  spreadsheetId - unique id of the newly created spreadsheet
   *  spreadsheetUrl - url of the the newly created spreadsheet
   */
  async createSpreadsheet() {
    try {
      const client = await this.auth.getClient();
      const sheets = google.sheets({ version: 'v4', auth: client });

      // create a new spreadsheet
      const createResponse = await sheets.spreadsheets.create({
        resource: {
          properties: {
            title: 'New Spreadsheet Created by Service Account'
          }
        }
      });

      const spreadsheetId = createResponse.data.spreadsheetId;
      const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
      Logger.info(`Successfully created spreadsheet with ID: ${spreadsheetId}`);
      Logger.info(`Spreadsheet URL: ${spreadsheetUrl}`);

      return { spreadsheetId, spreadsheetUrl };
    } catch (error) {
      Logger.error(`Error encountered createSpreadsheet`, error);
      throw error;
    }
  }

  /**
   * Share the spreadsheet using the unique given spreadsheetId to speficied list of emailAddresses
   * @param {*} spreadsheetId
   * @param {*} emailAddresses
   */
  async shareSpreadsheet(spreadsheetId, emailAddresses) {
    try {
      const client = await this.auth.getClient();
      const drive = google.drive({ version: 'v3', auth: client });

      // share the spreadsheet with specific email addresses
      for (const email of emailAddresses) {
        await drive.permissions.create({
          resource: {
            type: 'user',
            role: 'writer', // or 'reader' for read-only access
            emailAddress: email
          },
          fileId: spreadsheetId,
          sendNotificationEmail: true // send email notification to the user
        });
      }
      Logger.info(`Successfully shared spreadsheet with ID: ${spreadsheetId}`);
    } catch (error) {
      Logger.error(`Error encountered shareSpreadsheet`, error);
      throw error;
    }
  }

  async populateSpreadsheet(spreadsheetId) {
    try {
      const client = await this.auth.getClient();
      const sheets = google.sheets({ version: 'v4', auth: client });

      // TODO: define the data to be added
      const values = [
        ['Name', 'Age', 'Gender'], // Headers
        ['John Doe', 30, 'Male'],
        ['Jane Smith', 25, 'Female'],
        ['Sam Brown', 20, 'Male']
      ];

      const resource = {
        values
      };

      // populate the spreadsheet with data
      const updateResponse = await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'RAW',
        resource
      });

      Logger.info(
        `Successfully populate spreadsheet: ${updateResponse.data.updatedCells} cells updated.`
      );
    } catch (error) {
      Logger.error(`Error encountered populateSpreadsheet`, error);
      throw error;
    }
  }

  /**
   * Copy the spreadsheet with the given spreadsheetId
   * @param {*} spreadsheetId
   * @param {*} newTitle
   * @returns
   */
  async copySpreadsheet(spreadsheetId, newTitle) {
    try {
      const client = await this.auth.getClient();
      const drive = google.drive({ version: 'v3', auth: client });

      // copy the existing spreadsheet
      const copyResponse = await drive.files.copy({
        fileId: spreadsheetId,
        resource: {
          name: newTitle
        }
      });

      const newSpreadsheetId = copyResponse.data.id;
      const newSpreadsheetUrl = `https://docs.google.com/spreadsheets/d/${newSpreadsheetId}/edit`;

      Logger.info(`Successfully copied spreadsheet with ID: ${spreadsheetId}`);
      Logger.info(`New Spreadsheet ID: ${newSpreadsheetId}`);
      Logger.info(`New Spreadsheet URL: ${newSpreadsheetUrl}`);

      return { newSpreadsheetId, newSpreadsheetUrl };
    } catch (error) {
      Logger.error(
        `Error encountered copySpreadsheet with id ${spreadsheetId}`,
        error
      );
      throw error;
    }
  }
}

// Usage example
// (async () => {
//   const emailAddresses = ['arisculala@gmail.com']; // Replace with the email addresses you want to share with
//   const manager = new GoogleSpreadsheetApiManager();
//   try {
//     const { spreadsheetId, spreadsheetUrl } = await manager.createSpreadsheet();
//     await manager.shareSpreadsheet(spreadsheetId, emailAddresses);
//     await manager.populateSpreadsheet(spreadsheetId);
//   } catch (error) {
//     console.error('Error managing the spreadsheet:', error);
//   }
// })();

module.exports = GoogleSpreadsheetApiManager;
