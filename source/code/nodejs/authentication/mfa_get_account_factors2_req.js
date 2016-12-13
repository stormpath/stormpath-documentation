var account; // A previously fetched Account object

var collectionQueryOptions = {
  type: "sms"
};

account.getFactors(collectionQueryOptions, function(err, collectionResource){
  if (err) {
    return console.error(err);
  }

  var smsFactor = CollectionResource.items[0];
  console.log(smsFactor);
});
