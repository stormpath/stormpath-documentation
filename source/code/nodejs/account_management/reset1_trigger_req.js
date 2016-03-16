var resetPasswordOptions = {
  email: 'phasma@empire.gov'
};

application.resetPassword(resetPasswordOptions, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('A reset password email has been sent!');
});