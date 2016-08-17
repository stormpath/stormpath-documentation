var resendVerificationRequest = {
  login: 'email@address.com'
};

application.resendVerificationEmail(resendVerificationRequest, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Verification email sent!');
});