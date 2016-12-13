var application; // An Application, fetched from Client.getApplication();

var providerAccountRequest = {
  providerData: {
    providerId: 'facebook',
    accessToken: 'abc1235'
  }
};

application.getAccount(providerAccountRequest, function(err, providerAccountResult) {
  if (err) {
    return console.error(err);
  }

  // If the user is authenticating for the first time, a new Account is created in the Provider Directory
  if (providerAccountResult.created) {
    console.log('This user was newly created in the Directory.');
  }

  // The user is authenticated!
  console.log(providerAccountResult.account);
});
