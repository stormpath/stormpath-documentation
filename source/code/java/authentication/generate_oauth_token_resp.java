public interface OAuthGrantRequestAuthenticationResult extends OAuthRequestAuthenticationResult {
    String getAccessTokenString();
    AccessToken getAccessToken();
    String getRefreshTokenString();
    RefreshToken getRefreshToken();
    String getAccessTokenHref();
    String getTokenType();
    long getExpiresIn();
}
