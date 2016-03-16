var emailVerificationToken = '6YJv9XBH1dZGP5A8rq7Zyl';

client.getCurrentTenant(function (err, tenant) {
  if (err) {
    return console.error(err);
  }

  tenant.verifyAccountEmail(emailVerificationToken, function (err, account) {
    if (err) {
      return console.error(err);
    }

    console.log('Email for account %s verified!', account.href);
  });
});