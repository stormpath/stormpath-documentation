var disabledAccounts = await myDirectory
    .GetAccounts()
    .Where(acct => acct.Status == AccountStatus.Disabled)
    .ToListAsync();
