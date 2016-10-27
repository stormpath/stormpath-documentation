mappings = Stormpath::Provider::SamlMappingRules.new(
  items: [
    {
      name: 'uid',
      account_attributes: ['username']
    }
  ]
)

response = directory.create_attribute_mappings(mappings)
