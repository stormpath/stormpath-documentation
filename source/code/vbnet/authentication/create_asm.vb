Dim application = Await client.GetApplicationAsync(
    "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdleXaMPL")

Dim directory = Await client.GetDirectoryAsync(
    "https://api.stormpath.com/v1/directories/2SKhstu8PlaekcaEXampLE")

Dim newMapping = client.Instantiate(Of IApplicationAccountStoreMapping)() _
    .SetApplication(application) _
    .SetAccountStore(directory) _
    .SetListIndex(0) _
    .SetDefaultAccountStore(True) _
    .SetDefaultGroupStore(True)

Await application.CreateAccountStoreMappingAsync(newMapping)
