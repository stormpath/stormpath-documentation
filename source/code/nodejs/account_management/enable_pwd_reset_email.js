directory.getPasswordPolicy(function (err, passwordPolicy) {
  if (err) {
    return console.error(err);
  }

  passwordPolicy.resetEmailStatus = 'ENABLED';

  passwordPolicy.save(function (err, result) {
    if (err) {
      return console.error(err);
    }

    console.log('Reset password email enabled!');
  });
});