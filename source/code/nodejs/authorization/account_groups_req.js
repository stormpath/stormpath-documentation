var groupOptions = {
  expand: 'customData'
};

account.getGroups(groupOptions, function (err, groups) {
  if (err) {
    return console.error(err);
  }

  console.log('Retrieved groups for account:', groups);
});