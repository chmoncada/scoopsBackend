/**
 * Created by charlesmoncada on 29/10/16.
 */

var azure = require('azure-storage');
var qs = require('querystring');
var appSettings = require('mobileservice-config').appSettings;

exports.get = function(request, response) {

    // obtain required data from request
    var blobName = request.query.blobName;
    var containerName = 'scoops';

    // storageName
    var accountName = appSettings.STORAGE_ACCOUNT_NAME;

    // clave de acceso al storage
    var accountKey = appSettings.STORAGE_ACCOUNT_ACCESS_KEY;

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

            var sasURL = blobService.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);

            console.log('SAS ->' + sasURL);

            var sasQueryString = { 'sasUrl' : sasURL.baseUrl + sasURL.path + '?' + qs.stringify(sasURL.queryString) };
            response.send(200, sasQueryString);
        }
    });
};

function minutesFromNow(minutes) {
    var date = new Date();
    date.setMinutes(date.getMinutes() + minutes);
    return date;
}
