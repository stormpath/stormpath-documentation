var request = client.Providers()
    .Google()
    .Account()
    .SetAccessToken(access_token)
    .Build();
var result = await app.GetAccountAsync(request);
