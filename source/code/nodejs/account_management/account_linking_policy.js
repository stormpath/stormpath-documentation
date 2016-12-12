// Enable an Application's Account Linking Policy

var application; // An application, fetched from Client.getApplication();

application.getAccountLinkingPolicy(function(err, AccountLinkingPolicy) {
  if (err) {
    return console.error(err);
  }

  AccountLinkingPolicy.status = 'ENABLED';
  AccountLinkingPolicy.save();
});

// Enable an Organization's Account Linking Policy

var oganization; // A previously fetched organization object

organization.getAccountLinkingPolicy(function(err, AccountLinkingPolicy) {
  if (err) {
    return console.error(err);
  }
  
  AccountLinkingPolicy.status = 'ENABLED';
  AccountLinkingPolicy.save();
});
