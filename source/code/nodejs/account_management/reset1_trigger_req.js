var passwordResetRequest = {
  email: 'phasma@empire.gov'
};

application.sendPasswordResetEmail(passwordResetRequest, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('A reset password email has been sent!');
});