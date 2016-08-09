import com.stormpath.sdk.client.*;
import com.stormpath.sdk.api.ApiKeys;
import com.stormpath.sdk.cache.*;

Client client = Clients.builder()
          .setApiKey(ApiKeys.builder.setId("xxx").setSecret("xxx").build())
          .setCacheManager(Caches.newDisabledCacheManager())
          .build();

