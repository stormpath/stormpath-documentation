client = Stormpath::Client.new(
  api_key_file_location: api_key_file_location,
  cache: {
    store: Stormpath::Cache::RedisStore,
    regions: {
      directories: {
        ttl_seconds: 40,
        tti_seconds: 20
      },
      groups: {
        ttl_seconds: 80,
        tti_seconds: 40,
        store: Stormpath::Cache::MemoryStore
      }
    }
  }
)
