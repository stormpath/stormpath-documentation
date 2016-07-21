var directoryHref = 'https://api.stormpath.com/v1/directories/$DIRECTORY_ID';

client.getDirectory(directoryHref, function (err, directory) {
  if (err) {
    return console.error(err);
  }

  directory.getProvider(function (err, provider) {
    if (err) {
      return console.error(err);
    }

    console.log('Retrieved provider for directory', provider.href);
  });
});