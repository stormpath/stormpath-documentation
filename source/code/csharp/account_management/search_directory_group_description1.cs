var groupsInUS = await myDirectory
    .GetGroups()
    .Where(g => g.Description.Contains("/US"))
    .ToListAsync();
