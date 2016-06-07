Dim newMapping = client.Instantiate(Of IOrganizationAccountStoreMapping)() _
    .SetAccountStore(existingDirectory) _
    .SetListIndex(-1) _
    .SetDefaultAccountStore(True) _
    .SetDefaultGroupStore(True)

Await bankOfAOrg.CreateAccountStoreMappingAsync(newMapping)
