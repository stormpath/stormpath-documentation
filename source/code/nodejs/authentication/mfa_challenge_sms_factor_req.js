var account; // A previously fetched Account object;

var collectionQueryOptions = {
  type: 'sms'
};

account.getFactors(collectionQueryOptions, function(err, CollectionResource) {
  if (err) {
    return console.log(err);
  }

  var smsFactor = CollectionResource.items[0];

  var challenge = {
    message: 'Your verification code is ${code}"'
  };

  smsFactor.createChallenge(challenge, function(err, createdChallenge) {
    if (err) {
      return console.log(err);
    }

    console.log(createdChallenge);
  });
});
