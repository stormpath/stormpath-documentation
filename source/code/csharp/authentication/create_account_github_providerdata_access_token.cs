var request = client.Providers()
    .Github()
    .Account()
    .SetAccessToken(access_token)
    .Build();
var result = await app.GetAccountAsync(request);
