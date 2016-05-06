var apiKeyAuthRequest = new ApiKeyRequestBuilder()
    .SetId(api_key_id)
    .SetSecret(api_key_secret)
    .Build();

var result = await app.AuthenticateAccountAsync(apiKeyAuthRequest);
var account = await result.GetAccountAsync();
