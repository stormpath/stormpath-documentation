var groupsInUSEast = await myDirectory
    .GetGroups()
    .Where(g => g.Description.StartsWith("US East"))
    .ToListAsync();
