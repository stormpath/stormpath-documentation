var newPassword = 'updated+Password1234'

var resetPasswordToken = 'eyJraWQiOiIxZ0JUbmNXc[...]';

application.resetPassword(resetPasswordToken, newPassword, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('A password reset email has been sent!');
});