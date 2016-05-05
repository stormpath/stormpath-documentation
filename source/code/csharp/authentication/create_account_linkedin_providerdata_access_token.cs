var request = client.Providers()
    .LinkedIn()
    .Account()
    .SetAccessToken(access_token)
    .Build();
var result = await app.GetAccountAsync(request);
