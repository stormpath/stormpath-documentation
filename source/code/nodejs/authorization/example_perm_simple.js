account.getCustomData(function (err, customData) {
  if (err) {
    return console.error(err);
  }

  customData.create_admin = true;

  customData.save(function (err) {
    if (err) {
      return console.error(err);
    }

    console.log('Custom data updated.');
  })
});