var resetPasswordToken = 'eyJraWQiOiIxZ0JUbmNXc[...]';

application.verifyPasswordResetToken(resetPasswordToken, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Password has been reset.')
});