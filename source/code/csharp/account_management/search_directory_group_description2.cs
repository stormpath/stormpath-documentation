var groupsInUS = await myDirectory.GetGroups()
    .Where(g => g.Description.StartsWith("US East"))
    .ToListAsync();
