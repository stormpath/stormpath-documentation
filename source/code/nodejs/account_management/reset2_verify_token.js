var resetPasswordToken = 'eyJraWQiOiIxZ0JUbmNXc[...]';

application.verifyPasswordResetToken(resetPasswordToken, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Password is valid, and can be used for password reset.')
});