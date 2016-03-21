// Use Within() when you want to find everything within a logical unit like a day or year
var accountsModifiedOnDec1 = await myDirectory
    .GetAccounts()
    .Where(acct => acct.ModifiedAt.Within(2015, 12, 01))
    .ToListAsync();

// Use a DateTimeOffset instance when you want more granularity
var accountsCreatedAfterJan5 = await myDirectory
    .GetAccounts()
    .Where(acct => acct.CreatedAt >= new DateTimeOffset(2016, 1, 5, 00, 00, 00, TimeSpan.Zero)) // Midnight Jan 5 GMT
    .ToListAsync();
