var windowStart = new DateTimeOffset(2012, 01, 01, 00, 00, 00, TimeSpan.Zero);
var windowEnd = new DateTimeOffset(2015, 12, 31, 23, 59, 59, TimeSpan.Zero);

var accountsStartedBetween2012and2015 = await myDirectory
    .GetAccounts()
    .Where(a => (DateTimeOffset)a.CustomData["startDate"] >= windowStart
             && (DateTimeOffset)a.CustomData["startDate"] <= windowEnd)
    .Take(5)
    .ToListAsync();
