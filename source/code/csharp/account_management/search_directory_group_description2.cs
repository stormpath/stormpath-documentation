var groupsInUSEast = await myDirectory
    .GetGroups()
    .Where(g => g.Description.Contains("/US East"))
    .ToListAsync();
