directory.getPasswordPolicy({expand: 'strength'}, function (err, passwordPolicy) {
  if (err) {
    return console.error(err);
  }

  passwordPolicy.getStrength(function (err, passwordStrengthPolicy) {
    if (err) {
      return console.error(err);
    }

    passwordStrengthPolicy.preventReuse = 10;

    passwordStrengthPolicy.save(function (err) {
      if (err) {
        return console.error(err);
      }

      console.log('Password strength policy updated!');
    });
  });
});
