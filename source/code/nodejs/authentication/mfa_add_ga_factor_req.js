var account; // A previously fetched Account object

var factor = {
  type: 'google-authenticator',
  accountName: 'jakub@stormpath.com',
  issuer: 'Example App'
};

account.createFactor(factor, function(err, googleAuthenticatorFactor) {
  if (err) {
    return console.log(err);
  }

  console.log(googleAuthenticatorFactor);
});
