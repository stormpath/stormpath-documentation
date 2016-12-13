var application; // An application, fetched from Client.getApplication();

var accountData = {
  "email": "test123@email.com",
  "password": "APassword1234"
};

application.createAccount(accountData, function (err, account) {
  if (err) {
    return console.error(err);
  }

  console.log('Hello %s', account.email);
});
