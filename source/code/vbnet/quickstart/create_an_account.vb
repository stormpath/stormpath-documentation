Dim joe = Await myApp.CreateAccountAsync("Joe", "Stormtrooper", _
                                         "tk421@galacticempire.co", _
                                         "Changeme123!")
Console.WriteLine("User " & joe.FullName & " created")
