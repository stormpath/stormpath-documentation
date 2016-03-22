Dim groupsInUS = Await myDirectory _
    .GetGroups() _
    .Where(Function(g) g.Description.StartsWith("US")) _
    .ToListAsync()
