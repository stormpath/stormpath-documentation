var directoryData = {
  name: 'Captains',
  description: 'Captains from a variety of stories'
};

client.createDirectory(directoryData, function (err, directory) {
  if (err) {
    return console.error(err);
  }

  console.log('Created directory %s!', directory.href);
});