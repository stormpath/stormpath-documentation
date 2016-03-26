Dim groupsInUS = Await myDirectory _
    .GetGroups() _
    .Where(Function(g) g.Description.Contains("/US")) _
    .ToListAsync()
