import com.stormpath.sdk.authc;
import com.stormpath.sdk.account;

try {
  AuthenticationRequest authenticationRequest = UsernamePasswordRequest.builder()
              .setUsernameOrEmail("han@newrepublic.gov")
              .setPassword("first2shoot!")
              .withResponseOptions(new DefaultBasicAuthenticationOptions().withAccount())
              .build();
  AuthenticationResult result = application.authenticateAccount(authenticationRequest);

  Account account = result.getAccount();
} catch(IncorrectCredentialsException e) {
  e.printStackTrace();
}
