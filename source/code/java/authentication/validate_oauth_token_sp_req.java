try {
    OAuthBearerRequestAuthentication authRequest =
        OAuthRequests.OAUTH_BEARER_REQUEST
            .builder()
            .setJwt(grantResult.getAccessTokenString())
            .build();

    OAuthBearerRequestAuthenticationResult authResult =
        Authenticators.OAUTH_BEARER_REQUEST_AUTHENTICATOR
            .forApplication(application)
            .authenticate(authRequest);
} catch (ResourceException e) {
    //Not a valid authentication request
    e.printStackTrace();
} catch (JwtException e) {
    //Not a valid token
    e.printStackTrace();
}
