var accountsContainingLuc = await myApplication
    .GetAccounts()
    .Filter("Luc")
    .ToListAsync();
