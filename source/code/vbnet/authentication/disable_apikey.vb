Dim apiKey = Await app.GetApiKeyAsync(api_key_id)
apiKey.SetStatus(ApiKeyStatus.Disabled)
Await apiKey.SaveAsync()
