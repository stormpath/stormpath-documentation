Dim jwt = "incoming_uri".Split("="c)(1)

Dim idSiteTokenExchangeRequest = OauthRequests _
    .NewIdSiteTokenAuthenticationRequest() _
    .SetJwt(jwt) _
    .Build()

Dim grantResponse = Await app.NewIdSiteTokenAuthenticator() _
    .AuthenticateAsync(idSiteTokenExchangeRequest)

' Token is stored in grantResponse.AccessTokenString
