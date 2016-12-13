// First, get the fields
schema.getFields(function(err, collectionResource){
  if (err) {
    return console.error(err);
  }

  // Next, get the surname field and set it's required attribute to true
  var surnameField = collectionResource.items[1];

  surnameField.required = true;

  // Lastly, update the resource
  surnameField.save(function (err, updatedResource) {
    if (err) {
      return console.error(err);
    }

    console.log(updatedResource);
  });
});
