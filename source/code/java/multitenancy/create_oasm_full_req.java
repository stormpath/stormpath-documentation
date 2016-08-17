OrganizationAccountStoreMapping newMapping = client.instantiate(OrganizationAccountStoreMapping.class)
    .setAccountStore(existingDirectory)
    .setListIndex(-1)
    .setDefaultAccountStore(true)
    .setDefaultGroupStore(true);

bankOfAOrg.createAccountStoreMapping(newMapping);
