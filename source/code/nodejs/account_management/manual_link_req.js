var leftAccount = {
  href: 'https://api.stormpath.com/v1/accounts/7hOYWCzhhKDFHFzExample'
};

var rightAccount = {
  href: 'https://api.stormpath.com/v1/accounts/raxBrEj2lkxJeQExample'
};

// Link a current account with another account

var account; // A previously fetched account object

account.createAccountLink(rightAccount, function (err, accountLink) {
  if (!err) {
    console.log('Account Link Created', accountLink);
  }
});

// Link two accounts

var tenant; // A previously fetched tenant object

tenant.createAccountLink(leftAccount, rightAccount, function (err, accountLink) {
  if (!err) {
    console.log('Account Link Created', accountLink);
  }
});
