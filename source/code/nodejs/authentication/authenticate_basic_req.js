var client = new stormpath.Client({
  apiKey: {
    id: apiKeyId,
    secret: apiKeySecret
  }
});

client.getApplication(function (err, application) {
  if (err) {
    return console.error(err);
  }

  application.getAccount(function (err, account) {
    if (err) {
      return console.error(err);
    }

    console.log('Authenticated as account %s', account.href);
  });
});