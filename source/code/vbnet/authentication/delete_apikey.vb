Dim apiKey = Await app.GetApiKeyAsync(api_key_id)
Await apiKey.DeleteAsync()
