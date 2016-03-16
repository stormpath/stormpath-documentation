var emailVerificationOptions = {
  login: 'email@address.com'
};

application.resendVerificationEmail(emailVerificationOptions, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Verification email sent!');
});