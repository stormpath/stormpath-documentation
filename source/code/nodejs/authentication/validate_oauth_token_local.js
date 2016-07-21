var accessToken = 'access token to validate';
var authenticator = new stormpath.JwtAuthenticator(application);

authenticator.withLocalValidation();

authenticator.authenticate(accessToken, function (err, authResult) {
  if (err) {
    return console.error(err);
  }

  console.log('Got authentication result!', authResult);
});