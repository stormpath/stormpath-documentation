var picard = client.Instantiate<IAccount>()
    .SetUsername("jlpicard")
    .SetEmail("capt@enterprise.com")
    .SetGivenName("Jean-Luc")
    .SetSurname("Picard")
    .SetPassword("uGhd%a8Kl!");
await captainsDirectory.CreateAccountAsync(picard);
