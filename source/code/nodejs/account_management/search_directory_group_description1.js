var groupOptions = {
  description: 'US*'
};

directory.getGroups(groupOptions, function (err, result) {
  if (err) {
    return console.error(err);
  }

  console.log('Found %s US groups!', result.size);
});