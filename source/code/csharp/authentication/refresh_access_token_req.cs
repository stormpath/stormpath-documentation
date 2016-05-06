var refreshGrantRequest = OauthRequests.NewRefreshGrantRequest()
    .SetRefreshToken(refresh_token)
    .Build();

var grantResponse = await app.NewRefreshGrantAuthenticator()
    .AuthenticateAsync(refreshGrantRequest);
