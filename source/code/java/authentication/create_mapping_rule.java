AttributeStatementMappingRule mappingRule = new AttributeStatementMappingRule(
    "uid", //Name
    "urn:oasis:names:tc:SAML:2.0:attrname-format:basic", //NameFormat
    "username" //Account Attributes
);

SamlProvider samlProvider = (SamlProvider) directory.getProvider();

samlProvider
    .getAttributeStatementMappingRules()
    .add(mappingRule);
directory.save()
