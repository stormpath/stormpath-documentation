var facebookAuthRequest = {
  providerData : {
    providerId: 'facebook',
    accessToken: facebookAccessToken
  }
};

application.getAccount(facebookAuthRequest, function (err, account) {
  if (err) {
    return console.error(err);
  }

  console.log('Authenticated with Facebook account', account.href);
});