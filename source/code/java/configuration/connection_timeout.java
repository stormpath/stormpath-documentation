import com.stormpath.sdk.client.*;
import com.stormpath.sdk.api.ApiKeys;

Client client = Clients.builder()
          .setApiKey(ApiKeys.builder.setId("xxx").setSecret("xxx").build())
          .setConnectionTimeout(5000) //Milliseconds
          .build();

