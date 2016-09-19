var applicationHref = 'https://api.stormpath.com/v1/applications/$YOUR_APPLICATION_ID';

var authRequest = {
  username: 'han@newrepublic.gov',
  password: 'first2shoot!'
};

client.getApplication(applicationHref, function (err, application) {
  if (err) {
    return console.error(err);
  }

  application.authenticateAccount(authRequest, function (err, authResult) {
    if (err) {
      return console.error(err);
    }

    authResult.getAccount(function (err, account) {
      if (err) {
        return console.error(err);
      }

      console.log('Account has authenticated: ', account);
    });
  });
});