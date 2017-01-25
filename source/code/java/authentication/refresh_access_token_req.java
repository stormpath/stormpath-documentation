OAuthRefreshTokenRequestAuthentication request =
    OAuthRequests.OAUTH_REFRESH_TOKEN_REQUEST
        .builder()
        .setRefreshToken(refreshTokenString)
        .build();

OAuthGrantRequestAuthenticationResult authenticationResult =
    Authenticators.OAUTH_REFRESH_TOKEN_REQUEST_AUTHENTICATOR
        .forApplication(application)
        .authenticate(request);
