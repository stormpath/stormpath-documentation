Dim accountsModifiedOnDec1 = Await myDirectory _
    .GetAccounts() _
    .Where(Function(acct) acct.ModifiedAt.Within(2015, 12, 1)) _
    .ToListAsync()
