var request = client.Providers()
    .Facebook()
    .Account()
    .SetAccessToken(access_token)
    .Build();
var result = await app.GetAccountAsync(request);
