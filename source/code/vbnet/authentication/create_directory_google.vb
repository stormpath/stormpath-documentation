Imports Stormpath.SDK.Provider

Dim googleDirectory = client.Instantiate(Of IDirectory)()
googleDirectory.SetName("My Google Directory")

Await client.CreateDirectoryAsync(
    googleDirectory,
    Function(options) options.ForProvider(client _
                                          .Providers() _
                                          .Google() _
                                          .Builder() _
                                          .SetClientId("YOUR_GOOGLE_CLIENT_ID") _
                                          .SetClientSecret("YOUR_GOOGLE_CLIENT_SECRET") _
                                          .SetRedirectUri("YOUR_GOOGLE_REDIRECT_URI") _
                                          .Build()))
