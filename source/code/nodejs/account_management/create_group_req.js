var groupData = {
  name: 'Starfleet Officers',
  description: 'Commissioned officers in Starfleet',
  status: 'enabled'
};

directory.createGroup(groupData, function (err, group) {
  if (err) {
    return console.error(err);
  }

  console.log('Created group %s!', group.href);
});