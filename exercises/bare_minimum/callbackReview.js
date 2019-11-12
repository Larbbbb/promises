/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  // TODO
  var firstLineStream = fs.createReadStream(filePath, {encoding: 'utf8'});
  var acc = '';
  var pos = 0;
  var index;
  firstLineStream
    .on('data', function (chunk) {
      index = chunk.indexOf('\n');
      acc += chunk;
      index !== -1 ? firstLineStream.close() : pos += chunk.length;
    })
    .on('close', function () {
      callback(null, acc.slice(0, pos + index));
    })
    .on('error', function (err) {
      callback(err, null);
    });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  // TODO
  request(url, function(err, response) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, response.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
