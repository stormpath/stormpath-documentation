import com.stormpath.sdk.provider;
import com.stormpath.sdk.directory;
import com.stormpath.sdk.tenant;

Directory directory = client.instantiate(Directory.class);
directory.setName("My Facebook Directory");
directory.setDescription("A Facebook directory");

CreateDirectoryRequest request = Directories.newCreateRequestFor(directory).
            forProvider(Providers.FACEBOOK.builder()
                    .setClientId("YOUR_FACEBOOK_APP_ID")
                    .setClientSecret("YOUR_FACEBOOK_APP_SECRET")
                    .build()
            ).build();

Tenant tenant = client.getCurrentTenant();
directory = tenant.createDirectory(request);
