Imports Stormpath.SDK.Provider

Dim facebookDirectory = client.Instantiate(Of IDirectory)()
facebookDirectory.SetName("My Facebook Directory")

Await client.CreateDirectoryAsync(
    facebookDirectory,
    Function(options) options.ForProvider(client _
                                          .Providers() _
                                          .Facebook() _
                                          .Builder() _
                                          .SetClientId("YOUR_FACEBOOK_APP_ID") _
                                          .SetClientSecret("YOUR_FACEBOOK_APP_SECRET") _
                                          .Build()))
