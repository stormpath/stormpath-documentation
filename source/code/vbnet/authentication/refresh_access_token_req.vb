Dim refreshGrantRequest = OauthRequests.NewRefreshGrantRequest() _
    .SetRefreshToken(refresh_token) _
    .Build()

Dim grantResponse = Await app.NewRefreshGrantAuthenticator() _
    .AuthenticateAsync(refreshGrantRequest)
