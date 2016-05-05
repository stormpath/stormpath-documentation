var app = await client.GetApplicationAsync(
    "https://api.stormpath.com/v1/applications/5nan67mWrYrBmLGu7nGurh");

var accountStoreMappings = await app
    .GetAccountStoreMappings()
    .ToListAsync();
