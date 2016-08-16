import com.stormpath.sdk.provider;
import com.stormpath.sdk.directory;
import com.stormpath.sdk.tenant;

Directory directory = client.instantiate(Directory.class);
directory.setName("My LinkedIn Directory");
directory.setDescription("A Github directory");

CreateDirectoryRequest request = Directories.newCreateRequestFor(directory).
            forProvider(Providers.LINKEDIN.builder()
                    .setClientId("YOUR_LINKEDIN_APP_ID")
                    .setClientSecret("YOUR_LINKEDIN_APP_SECRET")
                    .build()
            ).build();

Tenant tenant = client.getCurrentTenant();
directory = tenant.createDirectory(request);
