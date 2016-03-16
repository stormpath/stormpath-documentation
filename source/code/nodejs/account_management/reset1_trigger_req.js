var resetPasswordOptions = {
  email: 'phasma@empire.gov'
};

application.resetPassword(resetPasswordOptions, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('A password reset email has been sent!');
});