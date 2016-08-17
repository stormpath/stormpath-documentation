var application, directory; // resources already obtained from a client instance.

var query = {
  givenName: 'Picard'
};

// This will search across all account stores that are mapped to this application:

application.getAccounts(query, function(err, collection) {
  collection.each(function(account, next) {
    console.log('Found a Picard account with email: ' + account.email + '');
    next();
  });
});

// This will only search in this directory:

directory.getAccounts(query, function(err, collection) {
  collection.each(function(account, next) {
    console.log('Found a Picard account with email: ' + account.email + '');
    next();
  });
});