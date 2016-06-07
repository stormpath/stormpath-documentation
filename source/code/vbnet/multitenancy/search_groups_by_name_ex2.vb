Dim tenantGroups = Await myDirectory.GetGroups() _
    .Where(Function(group) group.Name.StartsWith("bank-of-a.")) _
    .ToListAsync()
