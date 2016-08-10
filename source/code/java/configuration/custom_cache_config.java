import com.stormpath.sdk.client.*;
import com.stormpath.sdk.api.ApiKeys;
import com.stormpath.sdk.cache.*;

CacheManager cacheManager = Caches.newCacheManager()
          .withDefaultTimeToLive(1, TimeUnit.DAYS) //general default
          .withDefaultTimeToIdle(2, TimeUnit.HOURS) //general default
          .withCache(Caches.forResource(Application.class) //Application-specific cache settings
          .withTimeToLive(1, TimeUnit.HOURS)
          .withTimeToIdle(30, TimeUnit.MINUTES))
          .withCache(Caches.forResource(Directory.class) //Directory-specific cache settings
          .withTimeToLive(30, TimeUnit.MINUTES))
          .build(); //build the CacheManager

Client client = Clients.builder()
          .setApiKey(ApiKeys.builder.setId("xxx").setSecret("xxx").build())
          .setCacheManager(cacheManager)
          .build();

