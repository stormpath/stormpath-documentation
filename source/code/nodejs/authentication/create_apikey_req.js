account.createApiKey(function (err, apiKey) {
  if (err) {
    return console.error(err);
  }

  console.log('API key created', apiKey.id, apiKey.secret);
});