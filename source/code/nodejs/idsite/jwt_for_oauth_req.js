client.getApplication(applicationHref, function (err, application) {
  if (err) {
    return console.error(err);
  }

  var token = {
    stormpath_token: stormpathJwt
  }

  var authenticator = new stormpath.OAuthStormpathTokenAuthenticator(application);

  authenticator.authenticate(token, function (err, authResult) {
    if (err) {
      return console.error(err);
    }

    authResult.getAccount(function (err, account) {
      if (err) {
        return console.error(err);
      }

      console.log('Authenticated as', account.href);
    });
  });
});