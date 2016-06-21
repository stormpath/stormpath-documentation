var googleAuthRequest = {
  providerData : {
    providerId: 'google',
    accessToken: googleAccessToken
  }
};

application.getAccount(googleAuthRequest, function (err, account) {
  if (err) {
    return console.error(err);
  }

  console.log('Authenticated with Google account', account.href);
});