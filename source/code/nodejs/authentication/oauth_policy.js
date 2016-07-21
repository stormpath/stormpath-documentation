application.getOAuthPolicy(function (err, oauthPolicy) {
  if (err) {
    return console.error(err);
  }

  console.log('OAuth policy retrieved!', oauthPolicy.href);
});