/**
 * Created by charlesmoncada on 29/10/16.
 */

var azure = require('azure-storage');
var qs = require('querystring');
//var config = require('mobileservice-config');

function minutesFromNow(minutes) {
    var date = new Date();
    date.setMinutes(date.getMinutes() + minutes);
    return date;
}

var api = {
   get: function (req, res, next) {

       // obtain required data from request
       var blobName = req.query.blobName;
       console.log('blobname: %s', blobName);
       var containerName = 'scoops';

       // storageName
       var accountName = process.env.STORAGE_ACCOUNT_NAME;
       console.log('account Name: %s',accountName);

       // clave de acceso al storage
       var accountKey = process.env.STORAGE_ACCOUNT_ACCESS_KEY;

       var host = accountName + '.blob.core.windows.net/';

       var blobService = azure.createBlobService(accountName, accountKey, host);

       blobService.createContainerIfNotExists(containerName, {publicAccessLevel : 'blob'}, function(error){
           if(!error){
               // Container exists and is public
               var sharedAccessPolicy = {
                   AccessPolicy : {
                       Permissions: 'rw',
                       Expiry: minutesFromNow(15)
                   }
               };

               var sasToken = blobService.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);

               console.log('SAS ->' + sasToken);

               var sasQueryString = { token : sasToken, uri: blobService.getUrl(containerName, blobName, sasToken, true), sasURL: blobService.getUrl(containerName, sasToken, true) };
               console.log('SASQUERYSTRING: %s', sasQueryString);
               res.json(sasQueryString);
           }
       });
   }
};

api.get.access = 'authenticated';
module.exports = api;

