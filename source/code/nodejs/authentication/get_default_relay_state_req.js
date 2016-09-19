application.getSamlPolicy(function (err, samlPolicy) {
  if (err) {
    return console.log(err);
  }

  var endpoint = samlPolicy.serviceProvider.href + '/defaultRelayStates';

  client.createResource(endpoint, function(err, response){
    if (err) {
      return console.log(err);
    }

    console.log(response.defaultRelayState);
  });
});