application.getAccountStoreMappings(function (err, mappingsCollection) {
  if (err) {
    return console.error(err);
  }

  var secondMapping = mappingsCollection.items[1].accountStore;

  application.setDefaultAccountStore(secondMapping, function (err) {
    if (err) {
      return console.error(err);
    }

    console.log('Default account store was changed.');
  });

});