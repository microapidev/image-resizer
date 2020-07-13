const Buffer = require('buffer/').Buffer
const fs      = require('fs-extra');
const url     = require('url');
const request = require('request');
const path = require("path");

let params       = url.parse(httpRequest.url, true).query;
let imageURL     = params.url || params.uri || params.image;
let callbackName = params.callback || params.cb || '';

if (!imageURL) return httpResponse.end();
request(
    {url: imageURL, encoding: 'binary'},
    function onImageResponse(error, imageResponse, imageBody) {
      if (error) throw error;

      var imageType   = imageResponse.headers['content-type'];
      var base64      = new Buffer(imageBody, 'binary').toString('base64');
      var dataURI     = 'data:' + imageType + ';base64,' + base64;
      var jsonString  = JSON.stringify({
        code: imageResponse.statusCode,
        desc: http.STATUS_CODES[imageResponse.statusCode],
        type: imageType,
        orig: imageURL,
        data: dataURI
      });
      var jsonpString = callbackName + '(' + jsonString + ')';
      var payload     = callbackName ? jsonpString : jsonString;

      httpResponse.writeHead(imageResponse.statusCode, {'Content-Type': 'application/json'});
      httpResponse.write(payload);
      httpResponse.end();
      console.log(dataURI);
    }
);

function encode(file) {
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}
console.log(dataURI);
