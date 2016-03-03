//Create the account object
Account account = client.instantiate(Account.class);

//Set the account properties
account.setGivenName("Joe");
account.setSurname("Stormtrooper");
account.setUsername("tk421"); //optional, defaults to email if unset
account.setEmail("tk421@stormpath.com");
account.setPassword("Changeme1");

//Create the account using the existing Application object
account = application.createAccount(account);

System.out.println("Hello " + account.getFullName());
