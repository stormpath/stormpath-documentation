Dim request = client.Providers() _
    .Facebook() _
    .Account() _
    .SetAccessToken(access_token) _
    .Build()
Dim result = Await app.GetAccountAsync(request)
