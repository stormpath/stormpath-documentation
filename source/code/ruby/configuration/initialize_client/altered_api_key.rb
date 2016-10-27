client = Stormpath::Client.new(
  api_key_file_location: '/some/path/to/apiKey.properties',
  api_key_id_property_name: 'foo',
  api_key_secret_property_name: 'bar'
)
