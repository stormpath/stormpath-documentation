import com.stormpath.sdk.client.*;
import com.stormpath.sdk.api.ApiKeys;
import com.stormpath.sdk.hazelcast.*;
import com.hazelcast.client.HazelcastClient;
import com.hazelcast.core.HazelcastInstance;

HazelcastInstance hazelcastInstance = HazelcastClient.newHazelcastClient(yourHazelcastConfig);

CacheManager cacheManager = new HazelcastCacheManager(hazelcastInstance);

Client client = Clients.builder()
          .setApiKey(ApiKeys.builder.setId("xxx").setSecret("xxx").build())
          .setCacheManager(cacheManager)
          .build();
