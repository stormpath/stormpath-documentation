var account; // A previously fetched Account object

// In order to get all Factors
account.getFactors(function(err, collectionResource) {
  if (err) {
    return console.log(err);
  }

  console.log(collectionResource);
});

// Factors can be filtered by type. Change 'sms' to 'google-authenticator'
// to retrieve only the Google Authenticator Factors
var collectionQueryOptions = {
  type: 'sms'
};

account.getFactors(collectionQueryOptions, function(err, collectionResource) {
  if (err) {
    return console.log(err);
  }

  console.log(collectionResource);
});
