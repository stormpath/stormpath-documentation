Dim accountGroups = Await account.GetGroups() _
    .Expand(Function(g) g.GetCustomData()) _
    .ToListAsync()
