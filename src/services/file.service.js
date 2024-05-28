const fs = require('fs');
const zlib = require('zlib');
const Logger = require("../utils/logger");

class FileService {
  /**
   *  -- example usage
   *  const inputGzipPath = path.join(__dirname, 'report-sample.json.gz');
   *  const outputFilePath = path.join(__dirname, 'report-sample.json');
   *  FileService.extractGzip(inputGzipPath, outputFilePath);
   * @param {*} inputPath 
   * @param {*} outputPath 
   */
  static async extractGzip(inputPath, outputPath) {
    // create a read stream from the input file
    const input = fs.createReadStream(inputPath);
  
    // create a write stream to the output file
    const output = fs.createWriteStream(outputPath);
  
    // create a gunzip stream to decompress the file
    const gunzip = zlib.createGunzip();
  
    // pipe the input stream through the gunzip stream to the output stream
    input.pipe(gunzip).pipe(output);

    output.on('finish', () => {
      Logger.info(`File successfully extracted to ${outputPath}`)
    });
  
    output.on('error', (err) => {
      Logger.error(
        `Error extracting file: [FileService] extractGzip function`,
        error
      );
    });
  }
}

module.exports = FileService;