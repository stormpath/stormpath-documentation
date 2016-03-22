Dim accountsCreatedAfterMidnightJan5 = Await myDirectory _
    .GetAccounts() _
    .Where(Function(acct) acct.CreatedAt > New DateTimeOffset(2016, 1, 5, 0, 0, 0, TimeSpan.Zero)) _
    .ToListAsync() ' Jan 5 2016, midnight GMT
