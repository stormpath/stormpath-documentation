var application; // An Application, fetched from Client.getApplication();

var authRequest = {
  username: 'user@example.com',
  password: 'RawPassw0rd!',
  accountStore: {
    nameKey: 'app1'
  }
};

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
