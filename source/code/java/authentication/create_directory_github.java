import com.stormpath.sdk.provider;
import com.stormpath.sdk.directory;
import com.stormpath.sdk.tenant;

Directory directory = client.instantiate(Directory.class);
directory.setName("My Github Directory");
directory.setDescription("A Github directory");

CreateDirectoryRequest request = Directories.newCreateRequestFor(directory).
            forProvider(Providers.GITHUB.builder()
                    .setClientId("YOUR_GITHUB_CLIENT_ID")
                    .setClientSecret("YOUR_GITHUB_CLIENT_SECRET")
                    .build()
            ).build();

Tenant tenant = client.getCurrentTenant();
directory = tenant.createDirectory(request);
