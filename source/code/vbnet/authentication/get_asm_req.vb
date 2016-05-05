Dim app = Await client.GetApplicationAsync(
    "https://api.stormpath.com/v1/applications/5nan67mWrYrBmLGu7nGurh")

Dim accountStoreMappings = Await app _
    .GetAccountStoreMappings() _
    .ToListAsync()
