application.getSamlPolicy({ expand: 'serviceProvider' }, function (err, samlPolicy) {
  if (err) {
    return console.log(err);
  }

  var endpoint = samlPolicy.serviceProvider.href + '/defaultRelayStates';

  var options = {
    'organization': {
      'nameKey': 'my-org'
    }
  };

  client.createResource(endpoint, options, function(err, response){
    console.log(err, response.defaultRelayState);
  });
});
