Dim groupsInUSEast = Await myDirectory _
    .GetGroups() _
    .Where(Function(g) g.Description.Contains("/US East")) _
    .ToListAsync()
