var requestParams = {
  expand: 'resetEmailTemplates,resetSuccessEmailTemplates'
};

directory.getPasswordPolicy(requestParams, function(err, passwordPolicy){
  if (err) {
    return console.error(err);
  }

  var resetEmailTemplate = passwordPolicy.resetEmailTemplates.items[0];
  var resetSuccessEmailTemplate = passwordPolicy.resetSuccessEmailTemplates.items[0];

  console.log('Password Reset Email Template: ', resetEmailTemplate);
  console.log('Password Reset Success Email Template: ', resetSuccessEmailTemplate);
});
