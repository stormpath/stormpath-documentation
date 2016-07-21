account.getCustomData(function (err, customData) {
  if (err) {
    return console.error(err);
  }

  customData.create_admin = true;
  customData.name = 'createadmin';
  customData.description = 'This permission allows the account to create an admin';
  customData.action = 'read';
  customData.resource = '/admin/create';
  customData.effect = 'allow';

  customData.save(function (err) {
    if (err) {
      return console.error(err);
    }

    console.log('Custom data updated.');
  })
});