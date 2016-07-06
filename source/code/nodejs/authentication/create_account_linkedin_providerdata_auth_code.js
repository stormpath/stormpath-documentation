var linkedInAuthRequest = {
  providerData : {
    providerId: 'linkedin',
    code: linkedInAuthorizationCode
  }
};

application.getAccount(linkedInAuthRequest, function (err, account) {
  if (err) {
    return console.error(err);
  }

  console.log('Authenticated with LinkedIn account', account.href);
});