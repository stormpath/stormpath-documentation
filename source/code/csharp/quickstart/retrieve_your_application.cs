var myApp = await client.GetApplications()
    .Where(x => x.Name == "My Application")
    .SingleAsync();
