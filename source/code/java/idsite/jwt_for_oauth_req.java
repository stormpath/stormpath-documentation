// req is an HttpServletRequest
String jwtResponse = req.getParameter("jwtResponse");

IdSiteAuthenticationRequest idSiteAuthenticationRequest = OAuthRequests.IDSITE_AUTHENTICATION_REQUEST
    .builder()
    .setToken(jwtResponse)
    .build();

OAuthGrantRequestAuthenticationResult result = Authenticators.ID_SITE_AUTHENTICATOR
    .forApplication(application)
    .authenticate(idSiteAuthenticationRequest);

AccessToken accessToken = result.getAccessToken();
RefreshToken refreshToken = result.getRefreshToken();
