Dim request = client.Providers() _
    .Google() _
    .Account() _
    .SetCode(code) _
    .Build()
Dim result = Await app.GetAccountAsync(request)
