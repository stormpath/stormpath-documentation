var accountStore = {
  href: '1NUhrCPT0q66bjyexample'
};

application.setDefaultAccountStore(accountStore, function (err) {
  if (err) {
    return console.error(err);
  }

  application.setDefaultGroupStore(accountStore, function (err) {
    if (err) {
      return console.error(err);
    }

    console.log('Account and group store mappings set.');
  });
});