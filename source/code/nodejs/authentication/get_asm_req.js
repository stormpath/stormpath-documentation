var applicationHref = 'https://api.stormpath.com/v1/applications/5nan67mWrYrBmLGu7nGurh';

client.getApplication(applicationHref, function (err, application) {
  if (err) {
    return console.error(err);
  }

  application.getAccountStoreMappings(function (err, mappings) {
    if (err) {
      return console.error(err);
    }

    console.log('Account store mappings retrieved!', mappings);
  });
});