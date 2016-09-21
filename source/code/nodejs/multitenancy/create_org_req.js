var newOrganization = {
  name: 'Metal Works, Inc.',
  nameKey: 'metal-works'
};

client.createOrganization(newOrganization, function (err, organization) {
  if (err) {
    return console.log(err);
  }

  console.log(organization);
});