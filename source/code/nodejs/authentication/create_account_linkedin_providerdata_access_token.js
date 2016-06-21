var linkedInAuthRequest = {
  providerData : {
    providerId: 'linkedin',
    accessToken: linkedInAccessToken
  }
};

application.getAccount(linkedInAuthRequest, function (err, account) {
  if (err) {
    return console.error(err);
  }

  console.log('Authenticated with LinkedIn account', account.href);
});