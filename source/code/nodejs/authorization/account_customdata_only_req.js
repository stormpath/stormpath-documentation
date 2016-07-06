var customData = await account.GetCustomDataAsync();

account.getCustomData(function (err, customData) {
  if (err) {
    return console.error(err);
  }

  console.log('Retrieved custom data for account:', customData);
});