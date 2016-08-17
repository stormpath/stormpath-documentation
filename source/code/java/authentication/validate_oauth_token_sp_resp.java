public interface OAuthBearerRequestAuthenticationResult extends OAuthRequestAuthenticationResult {
    Account getAccount();
    Application getApplication();
    String getHref();
    String getJwt();
}
