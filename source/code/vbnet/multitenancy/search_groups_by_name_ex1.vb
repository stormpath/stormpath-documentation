Dim roleGroups = Await myDirectory.GetGroups() _
    .Where(Function(group) group.Name.StartsWith("bank-of-a.role.")) _
    .ToListAsync()
