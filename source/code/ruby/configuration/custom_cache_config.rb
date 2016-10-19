client = Stormpath::Client.new(
  api_key_file_location: api_key_file_location,
  cache: {
    regions: {
      applications: {
        ttl_seconds: 300,
        tti_seconds: 300
      }
    }
  }
)
