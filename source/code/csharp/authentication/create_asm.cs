var application = await client.GetApplicationAsync(
    "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdleXaMPL");

var directory = await client.GetDirectoryAsync(
    "https://api.stormpath.com/v1/directories/2SKhstu8PlaekcaEXampLE");

var newMapping = client.Instantiate<IApplicationAccountStoreMapping>()
    .SetApplication(application)
    .SetAccountStore(directory)
    .SetListIndex(0)
    .SetDefaultAccountStore(true)
    .SetDefaultGroupStore(true);

await application.CreateAccountStoreMappingAsync(newMapping);
