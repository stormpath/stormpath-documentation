var picard = {
  username: 'jlpicard',
  email: 'capt@enterprise.com',
  givenName: 'Jean-Luc',
  surname: 'Picard',
  password: '$stormpath2$SHA-256$256$salt$hash'
};

directory.createAccount(picard, {passwordFormat: 'MCF'}, function (err, account) {
  // ..
});