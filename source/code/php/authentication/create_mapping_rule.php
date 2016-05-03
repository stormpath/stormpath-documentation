$provider = \Stormpath\Resource\SamlProvider::get($directory->provider->href);

$ruleBuilder = new \Stormpath\Saml\AttributeStatementMappingRuleBuilder();
$rule = $ruleBuilder->setName('uid')
->setNameFormat('urn:oasis:names:tc:SAML:2.0:attrname-format:basic')
->setAccountAttributes(['username'])
->build();

$rulesBuilder = new \Stormpath\Saml\AttributeStatementMappingRulesBuilder();
$rulesBuilder->setAttributeStatementMappingRules([$rule]);
$rules = $rulesBuilder->build();

$provider->setAttributeStatementMappingRules($rules);

$provider->save();