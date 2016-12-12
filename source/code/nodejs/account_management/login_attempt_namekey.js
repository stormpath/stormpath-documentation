var authRequest = {
  username: 'han@newrepublic.gov',
  password: 'first2shoot!'
};

var application; // An Application, fetched from Client.getApplication();

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
