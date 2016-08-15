var accountHref = 'https://api.stormpath.com/v1/accounts/5u8BYZtu09s3yd1XtDYRSo';

client.getAccount(accountHref, {expand: 'customData'}, function (err, account) {
  if (err) {
    return console.error(err);
  }

  console.log('Custom data for account:', account.customData);
})