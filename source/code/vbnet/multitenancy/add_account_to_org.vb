Dim chewie = client.Instantiate(Of IAccount)() _
    .SetGivenName("Chewbacca") _
    .SetSurname("the Wookiee") _
    .SetUsername("rrwwgggh") _
    .SetEmail("chewie@kashyyyk.rim") _
    .SetPassword("Changeme123!")
chewie.CustomData.Put("favoriteShip", "Millennium Falcon")

Await bankOfAOrg.CreateAccountAsync(chewie)
