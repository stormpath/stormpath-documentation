directory.getAccountCreationPolicy({expand: 'verificationEmailTemplates'}, function (err, policy) {

  if (err) {
    return console.error(err);
  }

  var template = policy.verificationEmailTemplates.items[0];

  var email = 'robert@stormpath.com';

  template.fromEmailAddress = email;

  policy.save(function(err){
    if (err) {
      return console.error(err);
    }
    console.log('Template updated to use: ' + email);
  });

});