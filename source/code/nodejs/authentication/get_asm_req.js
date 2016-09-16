application.getAccountStoreMappings(function (err, mappingsCollection) {
  if (err) {
    return console.error(err);
  }

  mappingsCollection.each(function (mapping, next) {
    console.log(mapping);
    next();
  });

});
