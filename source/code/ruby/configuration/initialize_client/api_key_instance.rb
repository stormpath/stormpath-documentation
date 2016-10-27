api_key = Stormpath::ApiKey.new(api_id, api_secret)
client = Stormpath::Client.new(api_key: api_key)
