var schema; // A Schema object, fetched from Directory.getAccountSchema();

schema.getFields(function(err, collectionResource){
  if (err) {
    return console.error(err);
  }

  console.log(collectionResource);
});
