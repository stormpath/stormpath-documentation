import com.stormpath.sdk.account;
import com.stormpath.sdk.directory;

String accountHref = "https://api.stormpath.com/v1/accounts/cJoiwcorTTmkDDBsf02AbA"
CustomData customData = client.getResource(accountHref,
                                            Account.class,
                                            Accounts.criteria().withCustomData()).getCustomData();
