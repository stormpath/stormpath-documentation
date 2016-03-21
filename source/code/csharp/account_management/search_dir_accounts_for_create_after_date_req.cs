var accountsCreatedAfterMidnightJan5 = await myDirectory
    .GetAccounts()
    // Midnight Jan 5 GMT
    .Where(acct => acct.CreatedAt > new DateTimeOffset(2016, 1, 5, 00, 00, 00, TimeSpan.Zero))
    .ToListAsync();
