Dim groupsInUSEast = Await myDirectory _
    .GetGroups() _
    .Where(Function(g) g.Description.StartsWith("US East")) _
    .ToListAsync()
