directory.getAccountCreationPolicy(function (err, accountCreationPolicy) {

  if (err) {
    return console.error(err);
  }

  var allowedDomain = 'example.com';

  var blockedDomain = 'blacklisted.example.com';

  if (accountCreationPolicy.emailDomainWhitelist.indexOf(allowedDomain) === -1) {
    accountCreationPolicy.emailDomainWhitelist.push(allowedDomain);
  }

  if (accountCreationPolicy.emailDomainBlacklist.indexOf(allowedDomain) === -1) {
    accountCreationPolicy.emailDomainBlacklist.push(blockedDomain);
  }

  accountCreationPolicy.save(function (err) {
    if (err) {
      console.error(err);
    }
  });

});