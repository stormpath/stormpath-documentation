var authenticator = new stormpath.OAuthAuthenticator(application);

authenticator.authenticate(req, function (err, authResult) {
  if (err) {
    return console.error(err);
  }

  console.log('Got access token!', authResult.accessToken);
});