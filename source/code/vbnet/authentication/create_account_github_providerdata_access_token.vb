Dim request = client.Providers() _
    .Github() _
    .Account() _
    .SetAccessToken(access_token) _
    .Build()
Dim result = Await app.GetAccountAsync(request)
