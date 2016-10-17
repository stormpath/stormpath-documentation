composite_url = "http://#{api_key_id}:#{api_key_secret}@api.stormpath.com/v1/applications/#{application_id}"

application = Stormpath::Resource::Application.load(composite_url)
client = application.client
