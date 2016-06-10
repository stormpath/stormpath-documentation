var roleGroups = await myDirectory.GetGroups()
    .Where(group => group.Name.StartsWith("bank-of-a.role."))
    .ToListAsync();
