/**
 * Created by charlesmoncada on 27/10/16.
 */

var azureMobileApps = require("azure-mobile-apps");

var table = azureMobileApps.table();

table.columns = {

    "title" : "string",
    "author" : "string",
    "authorID": "string",
    "status": "string",
    "latitude": "number",
    "longitude": "number",
    "personsScoring": "number",
    "averageScore": "number",
    "imageURL": "string"
};

/*
Permisos de Acceso a tabla
 */

table.read.access = "anonymous";
table.update.access = "authenticated";
table.delete.access = "authenticated";
table.insert.access = "authenticated";

module.exports = table;