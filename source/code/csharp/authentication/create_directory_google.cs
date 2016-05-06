using Stormpath.SDK.Provider;

var googleDirectory = client.Instantiate<IDirectory>();
googleDirectory.SetName("My Google Directory");

await client.CreateDirectoryAsync(googleDirectory,
    options => options.ForProvider(
        client.Providers()
            .Google()
            .Builder()
            .SetClientId("YOUR_GOOGLE_CLIENT_ID")
            .SetClientSecret("YOUR_GOOGLE_CLIENT_SECRET")
            .SetRedirectUri("YOUR_GOOGLE_REDIRECT_URI")
            .Build()
        ));
