Directory dir = client.instantiate(Directory.class);
dir.setName("myDirectoryName");
dir = client.createDirectory(dir);
Account account = client.instantiate(Account.class)
        .setUsername("mlouis")
        .setEmail("mlouis@enterprise.com")
        .setGivenName("Martin")
        .setSurname("Louis")
        .setPassword("uGhd%a8Kl!");
dir.createAccount(account);