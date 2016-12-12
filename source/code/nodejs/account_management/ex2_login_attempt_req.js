var facebookAuthRequest = {
  providerData : {
    providerId: 'facebook',
    accessToken: facebookAccessToken,
    "accountStore": {
      "nameKey": "OrganizationA"
    }
  },
};

var application; // An application, fetched from Client.getApplication();

application.getAccount(facebookAuthRequest, function (err, account) {
  if (err) {
    return console.error(err);
  }

  console.log('Authenticated with Facebook account', account.href);
});
