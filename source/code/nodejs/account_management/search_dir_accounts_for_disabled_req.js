var accountOptions = {
  status: 'DISABLED'
};

directory.getAccounts(accountOptions, function (err, result) {
  if (err) {
    return console.error(err);
  }

  console.log('Found %s disabled accounts in directory!', result.size);
});