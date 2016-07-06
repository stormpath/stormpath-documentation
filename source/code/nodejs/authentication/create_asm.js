var applicationHref = 'https://api.stormpath.com/v1/applications/5nan67mWrYrBmLGu7nGurh';

var accountStoreMapping = {
  listIndex: 0,
  isDefaultAccountStore: true,
  isDefaultGroupStore: true,
  accountStore: {
    href: 'https://api.stormpath.com/v1/directories/2SKhstu8PlaekcaEXampLE'
  }
};

client.getApplication(applicationHref, function (err, application) {
  if (err) {
    return console.error(err);
  }

  application.createAccountStoreMapping(accountStoreMapping, function (err) {
    if (err) {
      return console.error(err);
    }

    console.log('Account store mapping created!');
  });
});