var applicationHref = 'https://api.stormpath.com/v1/applications/$APPLICATION_ID';

client.getApplication(applicationHref, function (err, application) {
  if (err) {
    return console.error(err);
  }

  application.authorizedCallbackUris = [
    'https://myapplication.com/whatever/callback',
    'https://myapplication.com/whatever/callback2'
  ];

  application.save(function (err) {
    if (err) {
      return console.error(err);
    }

    console.log('Authorized callback URIs updated.');
  });
});