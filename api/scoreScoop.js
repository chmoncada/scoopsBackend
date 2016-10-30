/**
 * Created by charlesmoncada on 30/10/16.
 */

//var azure = require("azure-mobile-apps");

var api;
api = {
    get: function (request, response, next) {

        var idScoop = request.query.idScoop;
        var score = parseInt(request.query.score);
        console.log('score: ' + score);
        //var query = "SELECT averageScore, personsScoring, title from scoops where id = '" + idScoop + "'";
        var query = {
            sql: 'SELECT averageScore, personsScoring, title FROM scoops WHERE id=@id',
            parameters: [{
                id: idScoop
            }]
        };

        request.azureMobile.data.execute(query)
            .then(function(results){
                console.log("**** RESULTADOS DEL QUERY:" + results[0]);
                response.json(results)
            });

    }
};

api.get.access = 'anonymous';


module.exports = api;