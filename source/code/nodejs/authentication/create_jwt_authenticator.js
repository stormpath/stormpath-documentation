var authenticator;
var appHref = 'https://api.stormpath.com/v1/applications/$APPLICATION_ID';

client.getApplication(appHref, function(err, application) {
  authenticator = new stormpath.JwtAuthenticator(application);
});