client.getAccount('account href', function (err, account) {
  if (err) {
    return console.error(err);
  }

  account.getCustomData(function (err, customData) {
    if (err) {
      return console.error(err);
    }

    console.log('Custom data for account:', customData);
  });
})