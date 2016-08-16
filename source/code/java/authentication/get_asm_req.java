import com.stormpath.sdk.application;
import com.stormpath.sdk.client;

Application application = client.getResource("https://api.stormpath.com/v1/applications/5nan67mWrYrBmLGu7nGurh", Application.class);

ApplicationAccountStoreMappingList application.getAccountStoreMappings();
