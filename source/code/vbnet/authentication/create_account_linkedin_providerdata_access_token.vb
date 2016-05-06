Dim request = client.Providers() _
    .LinkedIn() _
    .Account() _
    .SetAccessToken(access_token) _
    .Build()
Dim result = Await app.GetAccountAsync(request)
