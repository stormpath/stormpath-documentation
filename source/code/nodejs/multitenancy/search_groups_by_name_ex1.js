directory.getGroups({'name': 'bank-of-a.role.*'}, function(err, groupsCollection) {
  if (err) {
    return console.log(err);
  }

  groupsCollection.each(function (group, next) {
    console.log('Found group: ' + group.name);
    next();
  });
});