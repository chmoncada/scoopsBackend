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

        var query = {
            sql: 'SELECT [averageScore], [personsScoring], [title] FROM [dbo].[Scoops] WHERE ([id]=@id)',
            parameters: [{
                name: "id",
                pos: 1,
                value: idScoop
            }]
        };

        request.azureMobile.data.execute(query)
            .then(function(results){
                console.log("**** RESULTADOS DEL QUERY:" + results);
                var averageScoreDB = results[0].averageScore;
                var numberOfScores = results[0].personsScoring;

                var totalScoreDB = averageScoreDB * numberOfScores;

                var newNumberOfScores = numberOfScores + 1;
                var newTotal = totalScoreDB + score;

                var newAverage = newTotal / newNumberOfScores;

                console.log("el nuevo promedio es: ");
                console.log(newAverage);

                var query = {
                    sql: 'UPDATE [dbo].[Scoops] SET [averageScore]=@score, [personsScoring]=@numberOfScores  WHERE ([id]=@id)',
                    parameters: [{
                        name: "id",
                        pos: 1,
                        value: idScoop
                    },{
                        name: "score",
                        value: newAverage
                    },{
                        name: "numberOfScores",
                        value: newNumberOfScores
                    }]
                };

                request.azureMobile.data.execute(query).then(function (results) {
                   console.log("actualizado con exito")
                });

                response.json({ status : "EXITO",
                    nuevoaverage : newAverage
                })

            });

    }
};

api.get.access = 'anonymous';


module.exports = api;