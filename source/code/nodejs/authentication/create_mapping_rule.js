directory.getProvider({ expand: 'attributeStatementMappingRules' }, function (err, provider) {
  if (err) {
    return console.error(err);
  }

  provider.attributeStatementMappingRules.items.push(newAttributeMappingRule);

  provider.save(function(err){
    if (err) {
      return console.error(err);
    }

    console.log('Attribute mapping rules have been saved');
  });

});