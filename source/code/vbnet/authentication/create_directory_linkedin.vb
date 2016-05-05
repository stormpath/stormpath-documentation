Imports Stormpath.SDK.Provider

Dim linkedInDirectory = client.Instantiate(Of IDirectory)()
linkedInDirectory.SetName("My LinkedIn Directory")

Await client.CreateDirectoryAsync(
    linkedInDirectory,
    Function(options) options.ForProvider(client _
                                          .Providers() _
                                          .LinkedIn() _
                                          .Builder() _
                                          .SetClientId("YOUR_LINKEDIN_APP_ID") _
                                          .SetClientSecret("YOUR_LINKEDIN_APP_SECRET") _
                                          .Build()))
