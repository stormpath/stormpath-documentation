var account = await client.GetAccountAsync("account_href", req => req.Expand(acct => acct.GetCustomData()));
var customData = await account.GetCustomDataAsync();
