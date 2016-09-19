var accountStore = {
  href: 'https://api.stormpath.com/v1/directories/$DIRECTORY_ID'
};

application.setDefaultAccountStore(accountStore, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Default account store was changed.');
});