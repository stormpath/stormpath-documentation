client.getApplications({ name: 'My Application' }, function (err, applications) {
  if (err) {
    return console.error(err);
  }

  var application = applications.items[0];
});