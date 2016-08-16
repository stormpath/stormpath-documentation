import com.stormpath.sdk.saml;

AttributeStatementMappingRule mappingRule = new AttributeStatementMappingRule(
                                              "uid", //Name
                                              "urn:oasis:names:tc:SAML:2.0:attrname-format:basic", //NameFormat
                                              "username" //Account Attributes
                                            )
