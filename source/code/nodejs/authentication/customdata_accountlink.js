var anotherAccountHref = 'https://api.stormpath.com/v1/accounts/3fLduLKlEx';

account.getCustomData(function (err, customData) {
  if (err) {
    return console.error(err);
  }

  customData.accountLink = anotherAccountHref;

  customData.save(function (err) {
    if (err) {
      return console.error(err);
    }

    console.log('Custom data for account has been linked.');
  });
});