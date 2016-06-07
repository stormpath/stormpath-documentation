Dim account = Await client.GetAccountAsync("account_href", Function(req) req.Expand(Function(acct) acct.GetCustomData()))
Dim customData = Await account.GetCustomDataAsync()
