var accountData = {
  givenName: 'Joe',
  surname: 'Stormtrooper',
  username: 'tk421',
  email: 'tk421@stormpath.com',
  password: 'Changeme1'
};

var application; // An application, fetched from Client.getApplication();

application.createAccount(accountData, function (err, account) {
  if (err) {
    return console.error(err);
  }

  console.log(account);
});
