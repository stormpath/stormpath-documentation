client = Stormpath::Client.new(
  api_key_file_location: api_key_file_location,
  cache: {
    store: Stormpath::Cache::MemcachedStore,
    store_opts: {
      host: 'localhost:11311',
      prefix_key: 'mem'
    }
  }
)
