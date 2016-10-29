/**
 * Created by charlesmoncada on 27/10/16.
 */

var azureMobileApps = require('azure-mobile-apps');

var table = azureMobileApps.table();

table.columns = {

    "title" : "string",
    "scooptext" : "string",
    "author" : "string",
    "latitude": "number",
    "longitude": "number",
    "personsScoring": "number",
    "averageScore": "number",
    "imageURL": "string"
};

table.insert(function (context) {
    context.item.authorID = context.user.id;
    context.item.status = "No Publicado";
    return context.execute();
});


/*
Permisos de Acceso a tabla
 */

table.read.access = 'anonymous';
table.update.access = 'authenticated';
table.delete.access = 'authenticated';
table.insert.access = 'authenticated';

module.exports = table;
