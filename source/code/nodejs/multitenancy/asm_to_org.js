// The HREF of the directory that you want to map to this organization
var directoryHref = 'https://api.stormpath.com/v1/directories/$DIRECTORY_ID';

var accountStoreMapping = {
  accountStore: {
    href: directoryHref
  },
  isDefaultAccountStore: true,
  isDefaultGroupStore: true
};

organization.createAccountStoreMapping(accountStoreMapping, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log('Directory is mapped!');
});
