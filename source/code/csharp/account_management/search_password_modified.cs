var passwordsModifiedIn2015 = await myDirectory.GetAccounts()
    .Where(acct => acct.PasswordModifiedAt < new DateTimeOffset(2016, 1, 1, 0, 0, 0, TimeSpan.Zero))
    .ToListAsync();
