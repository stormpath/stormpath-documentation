var accountsModifiedOnDec1 = await myDirectory
    .GetAccounts()
    .Where(acct => acct.ModifiedAt.Within(2015, 12, 01))
    .ToListAsync();
