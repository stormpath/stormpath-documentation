var groupOptions = {
  name: 'My Group'
};

client.getGroups(groupOptions, function (err, groups) {
  if (err) {
    return console.error(err);
  }

  var group = groups.items[0];

  group.addAccount(account, function (err, membership) {
    if (err) {
      return console.error(err);
    }

    console.log('Membership created!', membership.href);
  });
});