var application; // An Application, fetched from Client.getApplication();

var authRequest = {
  username: 'jakub+factorman@stormpath.com',
  password: 'first2shoot!'
};

application.authenticateAccount(authRequest, function(err, authResult) {
  if (err) {
    return console.error(err);
  }

  authResult.getAccount(function(err, account){
    if (err) {
      return console.error(err);
    }

    console.log(account);
  });
});
