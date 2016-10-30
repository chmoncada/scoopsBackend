/**
 * Created by charlesmoncada on 29/10/16.
 */
var azure = require("azure-mobile-apps");
//var httpRequest = require("request");

var api;
api = {

    get: function (req, res, next) {

        var context = req.azureMobile;

        var myClaim;

        console.log('-- user -- ' + JSON.stringify(context.user));
        context.user.getIdentity()
            .then(function (identity) {

                //  var myClaim;
                if (identity.twitter){
                    console.log('******** Twitter Provider ********');
                    console.log('User Name -> ' + identity.twitter.claims.name + ' ------ ');
                    myClaim = {name : identity.twitter.claims.name,
                        //profilePic : identity.twitter.profile_image_url_https,
                        userId : identity.twitter.claims.nameidentifier,
                        webpage :identity.twitter.claims.webpage,
                        alias: identity.twitter.claims.upn,
                        provider : "twitter"
                    };

                    console.log("Claim create: -----> " + JSON.stringify(myClaim));

                    console.log('******** END Provider ********');

                }

                if (identity.facebook){
                    console.log('******** Facebook Provider ********');
                    console.log('User Name -> ' + identity.facebook.claims.name);

                    myClaim = {name : identity.facebook.claims.name,
                        userId : identity.facebook.claims.nameidentifier,
                        alias: identity.facebook.claims.surname,
                        provider : "facebook"
                    };

                    requestIdentityInfoFacebook(identity,res,next);

                }


                // context.res.status(200).type('application/json').send(indentity.twitter);
                context.res.status(200).type('application/json').send(myClaim);
                return (context);
            })
            .catch(function (error) {
                logger.error("Error --> ", error);
                context.res.status(500).type('application/json').send(error);
                return error;
            })

    }

};

function requestIdentityInfoFacebook(identities, res, next) {

    var url = 'https://graph.facebook.com/me?fields=id,name,birthday,hometown,email,picture,gender,friends&access_token=' +
        identities.access_token;

    console.log('****** ++ llamamos al api graph de Facebook --> ' + url);
    var reqParams = { uri: url, headers: { Accept: 'application/json' } };
    http.get(reqParams, function (err, resp, body) {
        var userData = JSON.parse(body);
        console.log('Logado -> ' + JSON.stringify(userData));

    });

}

api.get.access = 'authenticated';


module.exports = api;