var request = client.Providers()
    .Google()
    .Account()
    .SetCode(code)
    .Build();
var result = await app.GetAccountAsync(request);
