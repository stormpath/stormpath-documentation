var query = {
  q: 'luc'
};

application.getAccounts(query, function (err, result) {
  if (err) {
    return console.error(err);
  }

  console.log('Found %s matching accounts in application!', result.size);
});