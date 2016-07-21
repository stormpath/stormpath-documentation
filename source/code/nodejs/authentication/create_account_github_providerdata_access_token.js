var githubAuthRequest = {
  providerData : {
    providerId: 'github',
    accessToken: githubAccessToken
  }
};

application.getAccount(githubAuthRequest, function (err, account) {
  if (err) {
    return console.error(err);
  }

  console.log('Authenticated with GitHub account', account.href);
});