OAuthBearerRequestAuthentication bearerRequest =
    OAuthRequests.OAUTH_BEARER_REQUEST
        .builder()
        .setJwt(accessToken)
        .build();

OAuthBearerRequestAuthenticationResult bearerResult =
    Authenticators.OAUTH_BEARER_REQUEST_AUTHENTICATOR
        .forApplication(application)
        .authenticate(bearerRequest);
