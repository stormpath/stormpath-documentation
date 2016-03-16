var groupOptions = {
  description: 'US East*'
};

directory.getGroups(groupOptions, function (err, result) {
  if (err) {
    return console.error(err);
  }

  console.log('Found %s US East groups!', result.size);
});