var refreshTokenAuthenticator;
var appHref = 'https://api.stormpath.com/v1/applications/$APPLICATION_ID';

client.getApplication(appHref, function(err, application) {
  refreshTokenAuthenticator = new stormpath.OAuthRefreshTokenGrantRequestAuthenticator(application);
});