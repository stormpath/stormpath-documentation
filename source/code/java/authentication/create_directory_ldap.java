import com.stormpath.sdk.provider;
import com.stormpath.sdk.directory;
import com.stormpath.sdk.tenant;

Directory directory = client.instantiate(Directory.class);
directory.setName("My LDAP Directory");
directory.setDescription("A LDAP directory");

CreateDirectoryRequest request = Directories.newCreateRequestFor(directory).
            forProvider(Providers.GOOGLE.builder()
                    .setClientId("YOUR_GOOGLE_CLIENT_ID")
                    .setClientSecret("YOUR_GOOGLE_CLIENT_SECRET")
                    .setRedirectUri("YOUR_GOOGLE_REDIRECT_URI")
                    .build()
            ).build();

Tenant tenant = client.getCurrentTenant();
directory = tenant.createDirectory(request);
