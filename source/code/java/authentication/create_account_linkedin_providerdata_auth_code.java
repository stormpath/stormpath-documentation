import com.stormpath.sdk.provider;
import com.stormpath.sdk.account;

ProviderAccountRequest request = Providers.LINKEDIN.account()
            .setCode(accessToken)
            .build();

ProviderAccountResult result = application.getAccount(request);
Account account = result.getAccount();
