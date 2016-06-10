var newMapping = client.Instantiate<IOrganizationAccountStoreMapping>()
    .SetAccountStore(existingDirectory)
    .SetListIndex(-1)
    .SetDefaultAccountStore(true)
    .SetDefaultGroupStore(true);

await bankOfAOrg.CreateAccountStoreMappingAsync(newMapping);
