using Stormpath.SDK.Provider;

var facebookDirectory = client.Instantiate<IDirectory>();
facebookDirectory.SetName("My Facebook Directory");

await client.CreateDirectoryAsync(facebookDirectory,
    options => options.ForProvider(
        client.Providers()
            .Facebook()
            .Builder()
            .SetClientId("YOUR_FACEBOOK_APP_ID")
            .SetClientSecret("YOUR_FACEBOOK_APP_SECRET")
            .Build()
        ));
