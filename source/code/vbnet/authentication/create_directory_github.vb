Imports Stormpath.SDK.Provider

Dim githubDirectory = client.Instantiate(Of IDirectory)()
githubDirectory.SetName("My Github Directory")

Await client.CreateDirectoryAsync(
    githubDirectory,
    Function(options) options.ForProvider(client _
                                          .Providers() _
                                          .Github() _
                                          .Builder() _
                                          .SetClientId("YOUR_GITHUB_CLIENT_ID") _
                                          .SetClientSecret("YOUR_GITHUB_CLIENT_SECRET") _
                                          .Build()))
