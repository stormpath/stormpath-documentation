var authRequest = {
    username: 'han@newrepublic.gov',
    password: 'first2shoot!'
};

application.authenticateAccount(authRequest, function (err, authResult) {
  if (err) {
    return console.error(err);
  }

  return console.log('Authenticated with access token', authResult.getAccessToken());
});