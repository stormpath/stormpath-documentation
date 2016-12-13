Dim loginResult = Await app.AuthenticateAccountAsync(
    "joe.factorman@stormpath.com",
    "Changeme123")

Dim account = Await loginResult.GetAccountAsync()
