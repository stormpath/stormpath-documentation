try {
    OAuthBearerRequestAuthentication authRequest =
        OAuthRequests.OAUTH_BEARER_REQUEST
            .builder()
            .setJwt(grantResult.getAccessTokenString())
            .build();

    OAuthBearerRequestAuthenticationResult authResult =
        Authenticators.OAUTH_BEARER_REQUEST_AUTHENTICATOR
            .forApplication(app)
            .withLocalValidation()
            .authenticate(authRequest);
} catch (JwtException e) {
    //Not a valid token
    e.printStackTrace();
}
