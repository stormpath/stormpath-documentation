directory.getAccountCreationPolicy(function (err, accountCreationPolicy) {

  if (err) {
    return console.error(err);
  }

  var unBlockedDomain = 'blacklisted.example.com';

  accountCreationPolicy
    .emailDomainBlacklist
    .splice(accountCreationPolicy.emailDomainBlacklist.indexOf(unBlockedDomain),1);

  accountCreationPolicy.save(function (err) {
    if (err) {
      console.error(err);
    }
  });

});