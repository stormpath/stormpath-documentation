var apiKey = await app.GetApiKeyAsync(api_key_id);
await apiKey.DeleteAsync();
