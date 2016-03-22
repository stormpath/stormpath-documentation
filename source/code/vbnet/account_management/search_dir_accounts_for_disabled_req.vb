Dim disabledAccounts = Await myDirectory _
    .GetAccounts() _
    .Where(Function(acct) acct.Status = AccountStatus.Disabled) _
    .ToListAsync()
