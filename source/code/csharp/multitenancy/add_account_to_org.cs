var chewie = client.Instantiate<IAccount>()
    .SetGivenName("Chewbacca")
    .SetSurname("the Wookiee")
    .SetUsername("rrwwgggh")
    .SetEmail("chewie@kashyyyk.rim")
    .SetPassword("Changeme123!");
chewie.CustomData.Put("favoriteShip", "Millennium Falcon");

await bankOfAOrg.CreateAccountAsync(chewie);
