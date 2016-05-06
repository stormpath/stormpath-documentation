Dim apiKeyAuthRequest = New ApiKeyRequestBuilder() _
    .SetId(api_key_id) _
    .SetSecret(api_key_secret) _
    .Build()

Dim result = Await app.AuthenticateAccountAsync(apiKeyAuthRequest)
Dim account = Await result.GetAccountAsync()
