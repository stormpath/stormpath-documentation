var accountsCreatedAfterMidnightJan5 = await myDirectory
    .GetAccounts()
    // Jan 5 2016, midnight GMT
    .Where(acct => acct.CreatedAt > new DateTimeOffset(2016, 1, 5, 00, 00, 00, TimeSpan.Zero))
    .ToListAsync();
