var joe = await myApp.CreateAccountAsync("Joe", "Stormtrooper",
                                         "tk421@galacticempire.co",
                                         "Changeme123!");
Console.WriteLine("User " + joe.FullName + " created");
