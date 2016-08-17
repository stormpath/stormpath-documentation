Account chewie = client.instantiate(Account.class)
    .setGivenName("Chewbacca")
    .setSurname("the Wookiee")
    .setUsername("rrwwgggh")
    .setEmail("chewie@kashyyyk.rim")
    .setPassword("Changeme123!");
chewie.getCustomData().put("favoriteShip", "Millennium Falcon");

bankOfAOrg.createAccount(chewie);
