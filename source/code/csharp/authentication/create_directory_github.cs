using Stormpath.SDK.Provider;

var githubDirectory = client.Instantiate<IDirectory>();
githubDirectory.SetName("My Github Directory");

await client.CreateDirectoryAsync(githubDirectory,
    options => options.ForProvider(
        client.Providers()
            .Github()
            .Builder()
            .SetClientId("YOUR_GITHUB_CLIENT_ID")
            .SetClientSecret("YOUR_GITHUB_CLIENT_SECRET")
            .Build()
        ));
