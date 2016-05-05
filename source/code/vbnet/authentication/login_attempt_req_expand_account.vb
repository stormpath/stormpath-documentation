Dim loginRequest = New UsernamePasswordRequestBuilder() _
    .SetUsernameOrEmail("han@newrepublic.gov") _
    .SetPassword("first2shoot!") _
    .Build()

Dim loginResult = Await app.AuthenticateAccountAsync(
    loginRequest,
    Function(opt) opt.Expand(Function(result) result.GetAccount()))
