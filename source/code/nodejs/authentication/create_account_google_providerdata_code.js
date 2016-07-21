var googleAuthRequest = {
  providerData : {
    providerId: 'google',
    code: googleAuthorizationCode
  }
};

application.getAccount(googleAuthRequest, function (err, account) {
  if (err) {
    return console.error(err);
  }

  console.log('Authenticated with Google account', account.href);
});