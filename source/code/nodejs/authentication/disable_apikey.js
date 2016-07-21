var apiKeyId = '499NWDNF09Ktest41A9CAB4';

application.getApiKey(apiKeyId, function (err, apiKey) {
  if (err) {
    return console.error(err);
  }

  apiKey.status = 'DISABLED';

  apiKey.save(function (err) {
    if (err) {
      return console.error(err);
    }

    console.log('API key has been disabled!');
  });
});