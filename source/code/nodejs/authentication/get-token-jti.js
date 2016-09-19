var njwt = require('njwt');
var stormpath = require('stormpath');

// This should be the API Key Secret that was used to create the
// Stormpath client instance that created the accessToken

var tenantApiKey = {
  id: process.env.STORMPATH_CLIENT_APIKEY_ID,
  secret: process.env.STORMPATH_CLIENT_APIKEY_SECRET
};

var client = new stormpath.Client({
  apiKey: tenantApiKey
});

var signingKey = tenantApiKey.secret;

var accessToken = 'eyJraWQiOiI2NldURFJVM1paSkNZVFJVVlZTUUw3WEJOIiwic3R0IjoiYWNjZXNzIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiIyc0k5cWw1MmU0WHhFMDk2Um1KcGpaIiwiaWF0IjoxNDc0MDU4MjQyLCJpc3MiOiJodHRwczovL2FwaS5zdG9ybXBhdGguY29tL3YxL2FwcGxpY2F0aW9ucy8yNGs3SG5ET3o0dFE5QVJzQnRQVU42Iiwic3ViIjoiaHR0cHM6Ly9hcGkuc3Rvcm1wYXRoLmNvbS92MS9hY2NvdW50cy81dThCWVp0dTA5czN5ZDFYdERZUlNvIiwiZXhwIjoxNDc0MDU4ODQyLCJydGkiOiIxUm90RWtRMUlXVHVlbHp5QU5rMDZmIn0.lD6jgWmjORzb6at73DmOBC5goR-Ma11RviXVQeh_OGg';

njwt.verify(accessToken, signingKey, function (err, verifiedJwt) {
  if (err) {

    // An error likey indidcates that the token has expired, which
    // would mean that the token has already been automatically
    // removed from the REST API.

    return console.log(err);
  }

  var tokenHref = 'https://api.stormpath.com/v1/accessTokens/' + verifiedJwt.body.jti;

  client.getAccessToken(tokenHref, function(err, accessToken) {
    if (err) {
      // If you get a 404, the token has already been deleted
      return console.log(err);
    }

    accessToken.delete(function (err) {
      if (err) {
        return console.log(err);
      }

      console.log('Token was deleted.');
    });
  });
});
