var leftAccount = {
  href: 'https://api.stormpath.com/v1/accounts/7hOYWCzhhKDFHFzExample'
};

var rightAccount = {
  href: 'https://api.stormpath.com/v1/accounts/raxBrEj2lkxJeQExample'
};

// You can link a current Account with another Account using Account.createAccountLink();

var account; // A previously fetched Account object

account.createAccountLink(rightAccount, function (err, accountLink) {
  if (err) {
    return console.error(err);
  }

  console.log('Account Link Created', accountLink);
});

// OR you can link two Accounts using Tenant.createAccountLink();

var tenant; // A previously fetched Tenant object

tenant.createAccountLink(leftAccount, rightAccount, function (err, accountLink) {
  if (err) {
    return console.error(err);
  }

  console.log('Account Link Created', accountLink);
});
