OAuthPasswordGrantRequestAuthentication request =
    OAuthRequests.OAUTH_PASSWORD_GRANT_REQUEST
        .builder()
        .setPassword("first2shoot!")
        .setLogin("han@newrepublic.gov")
        .build();

OAuthGrantRequestAuthenticationResult authenticationResult =
    Authenticators.OAUTH_PASSWORD_GRANT_REQUEST_AUTHENTICATOR
        .forApplication(application)
        .authenticate(request);
