Dim accountsContainingLuc = Await myApplication _
    .GetAccounts() _
    .Filter("Luc") _
    .ToListAsync()
