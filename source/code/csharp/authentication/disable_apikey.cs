var apiKey = await app.GetApiKeyAsync(api_key_id);
apiKey.SetStatus(ApiKeyStatus.Disabled);
await apiKey.SaveAsync();
