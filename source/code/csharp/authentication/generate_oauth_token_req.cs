var grantRequest = OauthRequests.NewPasswordGrantRequest()
    .SetLogin("han@newrepublic.gov")
    .SetPassword("first2shoot!")
    .Build();

var grantResponse = await app.NewPasswordGrantAuthenticator()
    .AuthenticateAsync(grantRequest);
