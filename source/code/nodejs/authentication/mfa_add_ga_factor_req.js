var factor = {
  type: 'google-authenticator',
  accountName: 'jakub@stormpath.com',
  issuer: 'Example App'
};

var account; // A previously fetched Account object

account.createFactor(factor, function(err, googleAuthenticatorFactor) {
  if (err) {
    return console.log(err);
  }

  console.log(googleAuthenticatorFactor);
});
