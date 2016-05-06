var validationRequest = OauthRequests.NewJwtAuthenticationRequest()
    .SetJwt(access_token)
    .Build();

var accessToken = await app.NewJwtAuthenticator()
    .AuthenticateAsync(validationRequest);
