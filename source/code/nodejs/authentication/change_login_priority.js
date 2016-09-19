application.getAccountStoreMappings(function (err, mappingsCollection) {
  if (err) {
    return console.error(err);
  }

  var secondMapping = mappingsCollection.items[1];

  secondMapping.listIndex = 0;

  secondMapping.save(function () {
    if (err) {
      return console.error(err);
    }
    console.log('Mapping was updated');
  });

});