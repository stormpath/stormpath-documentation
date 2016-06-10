var jwt = incoming_uri.Split('=')[1];

var idSiteTokenExchangeRequest = OauthRequests
    .NewIdSiteTokenAuthenticationRequest()
    .SetJwt(jwt)
    .Build();

var grantResponse = await app.NewIdSiteTokenAuthenticator()
    .AuthenticateAsync(idSiteTokenExchangeRequest);
