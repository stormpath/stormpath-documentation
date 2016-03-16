var accountData = {
  username: 'jlpicard',
  email: 'capt@enterprise.com',
  givenName: 'Jean-Luc',
  surname: 'Picard',
  password: 'uGhd%a8Kl!'
};

directory.createAccount(accountData, function (err, account) {
  if (err) {
    return console.error(err);
  }

  console.log('Hello %s!', account.fullName);
});