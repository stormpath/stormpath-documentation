var tenantGroups = await myDirectory.GetGroups()
    .Where(group => group.Name.StartsWith("bank-of-a."))
    .ToListAsync();
