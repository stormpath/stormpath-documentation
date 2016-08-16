Directory directory = client.instantiate(Directory.class);
directory.setName("My LinkedIn Directory");
directory.setDescription("A LinkedIn directory");

CreateDirectoryRequest request = Directories.newCreateRequestFor(directory)
    .forProvider(Providers.LINKEDIN.builder()
        .setClientId("YOUR_LINKEDIN_APP_ID")
        .setClientSecret("YOUR_LINKEDIN_APP_SECRET")
        .build()
    ).build();

directory = client.createDirectory(request);
