import com.stormpath.sdk.client.*;
import com.stormpath.sdk.api.ApiKeys;

Proxy proxy = new Proxy("whatever.domain.com", 443);

Client client = Clients.builder()
          .setApiKey(ApiKeys.builder.setId("xxx").setSecret("xxx").build())
          .setProxy(proxy)
          .build();

