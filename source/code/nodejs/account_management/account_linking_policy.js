// You can enable an Application's Account Linking Policy

var application; // An application, fetched from Client.getApplication();

application.getAccountLinkingPolicy(function(err, AccountLinkingPolicy) {
  if (err) {
    return console.error(err);
  }

  AccountLinkingPolicy.status = 'ENABLED';

  AccountLinkingPolicy.save(function (err, updatedResource) {
    if (err) {
      return console.error(err);
    }

    console.log('Enabled Account Linking Policy: ', updatedResource);
  });
});

// You can also enable an Organization's Account Linking Policy

var organization; // A previously fetched Organization object

organization.getAccountLinkingPolicy(function(err, AccountLinkingPolicy) {
  if (err) {
    return console.error(err);
  }

  AccountLinkingPolicy.status = 'ENABLED';

  AccountLinkingPolicy.save(function (err, updatedResource) {
    if (err) {
      return console.error(err);
    }

    console.log('Enabled Account Linking Policy: ', updatedResource);
  });
});
