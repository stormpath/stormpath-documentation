application.getSamlPolicy({ expand: 'serviceProvider' }, function (err, samlPolicy) {
  if (err) {
    return console.log(err);
  }

  console.log(samlPolicy);
});