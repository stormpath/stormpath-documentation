client.getApplication(applicationHref, function (err, application) {
  if (err) {
    return console.error(err);
  }

  var redirectUrl = application.createIdSiteUrl({
    callbackUri: 'http://mysite.foo/idsiteCallback'
  });

  console.log('ID site redirect URL', redirectUrl);
});