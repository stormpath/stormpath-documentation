Dim passwordsModifiedIn2015 = Await myDirectory.GetAccounts() _
    .Where(Function(acct) acct.PasswordModifiedAt < New DateTimeOffset(2016, 1, 1, 0, 0, 0, TimeSpan.Zero)) _
    .ToListAsync()
