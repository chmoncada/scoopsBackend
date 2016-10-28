
var express = require("express"),
    azuremobileapps = require("azure-mobile-apps");

var app = express(),
    mobile = azuremobileapps();

mobile.tables.import("./tables");

mobile.api.import("./api");

app.use(mobile);

app.listen(process.env.PORT || 3000);


