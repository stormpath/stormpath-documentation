Dim myApp = Await client.GetApplications _
    .Where(Function(a) a.Name = "My Application") _
    .SingleAsync()
