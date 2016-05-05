using Stormpath.SDK.Provider;

var linkedInDirectory = client.Instantiate<IDirectory>();
linkedInDirectory.SetName("My LinkedIn Directory");

await client.CreateDirectoryAsync(linkedInDirectory,
    options => options.ForProvider(
        client.Providers()
            .LinkedIn()
            .Builder()
            .SetClientId("YOUR_LINKEDIN_APP_ID")
            .SetClientSecret("YOUR_LINKEDIN_APP_SECRET")
            .Build()
        ));
