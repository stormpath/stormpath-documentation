Dim picard = client.Instantiate(Of IAccount)() _
    .SetUsername("jlpicard") _
    .SetEmail("capt@enterprise.com") _
    .SetGivenName("Jean-Luc") _
    .SetSurname("Picard") _
    .SetPassword("uGhd%a8Kl!")
Await captainsDirectory.CreateAccountAsync(picard)
