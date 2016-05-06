Dim grantRequest = OauthRequests.NewPasswordGrantRequest() _
    .SetLogin("han@newrepublic.gov") _
    .SetPassword("first2shoot!") _
    .Build()

Dim grantResponse = Await app.NewPasswordGrantAuthenticator() _
    .AuthenticateAsync(grantRequest)
