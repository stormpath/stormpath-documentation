Directory directory = client.instantiate(Directory.class);
directory.setName("My Google Directory");
directory.setDescription("A Google directory");

CreateDirectoryRequest request = Directories.newCreateRequestFor(directory)
    .forProvider(Providers.GOOGLE.builder()
        .setClientId("YOUR_GOOGLE_CLIENT_ID")
        .setClientSecret("YOUR_GOOGLE_CLIENT_SECRET")
        .setRedirectUri("YOUR_GOOGLE_REDIRECT_URI")
        .build()
    ).build();

directory = client.createDirectory(request);
