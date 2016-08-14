Account picard = client.instantiate(Account.class)
    .setUsername("jlpicard")
    .setEmail("capt@enterprise.com")
    .setGivenName("Jean-Luc")
    .setSurname("Picard")
    .setPassword("uGhd%a8Kl!");

captainsDirectory.createAccount(picard);
