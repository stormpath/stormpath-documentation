account.getGroups({expand: 'customData'}, function (err, groups) {
  if (err) {
    return console.error(err);
  }

  groups.each(function(group, next){
    console.log('Account is in group "' + group.name +'"');
    console.log('The customData object of the group contains: ', group.customData);
    next();
  });

});