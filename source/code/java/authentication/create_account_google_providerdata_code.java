import com.stormpath.sdk.provider;
import com.stormpath.sdk.account;

ProviderAccountRequest request = Providers.GOOGLE.account()
            .setCode(code)
            .build();

ProviderAccountResult result = application.getAccount(request);
Account account = result.getAccount();
