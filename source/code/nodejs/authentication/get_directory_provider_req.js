var directoryHref = 'https://api.stormpath.com/v1/directories/5TG9Xa0e0PC3jO3xbZao1K';

client.getDirectory(directoryHref,function (err,directory) {
  if (err) {
    return console.error(err);
  }

  directory.getProvider({ expand: 'serviceProviderMetadata' }, function (err, provider) {
    if (err) {
      return console.error(err);
    }

    console.log(provider);
  });
});