ApplicationAccountStoreMapping mapping = client.instantiate(ApplicationAccountStoreMapping.class)
    .setAccountStore(accountStore) // this could be an existing group or a directory
    .setApplication(application)
    .setDefaultAccountStore(Boolean.TRUE)
    .setDefaultGroupStore(Boolean.TRUE)
    .setListIndex(0);

application.createAccountStoreMapping(mapping);
