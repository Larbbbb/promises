/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */
var readLine = require('./../bare_minimum/promiseConstructor.js');
var Promise = require('bluebird');
var fs = require('fs');

var combineFirstLineOfManyFiles = function (filePaths, writePath) {

  var promiseArr = [];

  filePaths.forEach((element) => {
    promiseArr.push(readLine.pluckFirstLineFromFileAsync(element));
  });

  return Promise.all(promiseArr).then(function (promiseResults) {
    new Promise(function (resolve, reject) {
      fs.writeFile(writePath, promiseResults.join('\n'), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
};

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};