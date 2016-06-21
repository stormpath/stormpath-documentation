application.getOAuthPolicy(function (err, oauthPolicy) {
  if (err) {
    return console.error(err);
  }

  oauthPolicy.accessTokenTtl = 'PT30M';
  oauthPolicy.refreshTokenTtl = 'P7D';

  oauthPolicy.save(function (err) {
    if (err) {
      return console.error(err);
    }

    console.log('OAuth policy updated!');
  })
});