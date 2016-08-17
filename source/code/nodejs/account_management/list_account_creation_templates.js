var requestParams = {
  expand: 'verificationEmailTemplates,verificationSuccessEmailTemplates,welcomeEmailTemplates'
};

directory.getAccountCreationPolicy(requestParams, function(err, accountCreationPolicy){
  if (err) {
    return console.error(err);
  }

  var verificationEmailTemplate = accountCreationPolicy.verificationEmailTemplates.items[0];
  var verificationSuccessEmailTemplate = accountCreationPolicy.verificationSuccessEmailTemplates.items[0];
  var welcomeEmailTemplate = accountCreationPolicy.welcomeEmailTemplates.items[0];

  console.log('Verification Email Template: ', verificationEmailTemplate);
  console.log('Verification Success Email Template: ', verificationSuccessEmailTemplate);
  console.log('Welcome Email Template: ', welcomeEmailTemplate);
});