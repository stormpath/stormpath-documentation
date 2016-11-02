client = Stormpath::Client.new(
  api_key_file_location: api_key_file_location,
  cache: {
    store: Stormpath::Cache::RedisStore,
    store_opts: {
      host: '10.0.1.1',
      port: 6380,
      db: 15
    }
  }
)
