var usernamePasswordRequest = {
  username: 'tk421@stormpath.com',
  password: 'Changeme1'
};

application.authenticateAccount(usernamePasswordRequest, function (err, result) {
  if (err) {
    return console.error(err);
  }

  var account = result.account;

  console.log('Authenticated as %s with email %s', account.username, account.email);
});