directory.getPasswordPolicy(function (err, passwordPolicy) {
  if (err) {
    return console.error(err);
  }

  passwordPolicy.getStrength(function (err, passwordStrengthPolicy) {
    if (err) {
      return console.error(err);
    }

    passwordStrengthPolicy.minLength = 1;
    passwordStrengthPolicy.maxLength = 24;
    passwordStrengthPolicy.minSymbol = 1;

    passwordStrengthPolicy.save(function (err) {
      if (err) {
        return console.error(err);
      }

      console.log('Password strength policy updated!');
    });
  });
});