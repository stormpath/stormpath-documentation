var accountGroups = await account
    .GetGroups()
    .Expand(g => g.GetCustomData())
    .ToListAsync();
