//Create the account object
Account account = client.instantiate(Account.class);

//Set the  account properties that are required according to the schema
account.setEmail("tk421@stormpath.com");
account.setPassword("Changeme1");

//Create the account using the existing Application object
account = application.createAccount(account);

