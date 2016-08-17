var query = {
  status: 'DISABLED'
};

directory.getAccounts(query, function (err, result) {
  if (err) {
    return console.error(err);
  }

  console.log('Found %s disabled accounts in directory!', result.size);
});