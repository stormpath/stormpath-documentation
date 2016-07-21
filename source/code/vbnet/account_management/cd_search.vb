Dim windowStart = New DateTimeOffset(2012, 1, 1, 0, 0, 0, TimeSpan.Zero)
Dim windowEnd = New DateTimeOffset(2015, 12, 31, 23, 59, 59, TimeSpan.Zero)

Dim accountsStartedBetween2012and2015 = Await myDirectory _
    .GetAccounts() _
    .Where(Function(a) a.CustomData("startDate") >= windowStart _
               AndAlso a.CustomData("startDate") <= windowEnd) _
    .Take(5) _
    .ToListAsync()
