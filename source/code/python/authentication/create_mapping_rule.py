rule_uid = AttributeStatementMappingRule(name='uid', account_attributes=['username'])
rule_mail = AttributeStatementMappingRule(name='mail', account_attributes=['email'])
rule_location = AttributeStatementMappingRule(name='location', account_attributes=['customData.location'])

asmr = directory.provider.attribute_statement_mapping_rules
asmr.items = [rule_uid, rule_mail, rule_location]
asmr.save()
