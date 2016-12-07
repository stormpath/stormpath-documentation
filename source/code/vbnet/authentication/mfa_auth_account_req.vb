Dim loginResult = Await app.AuthenticateAccountAsync( _
      "joe.factorman@stormpath.com", _
      "Changeme123")

Dim account = Await loginResult.GetAccountAsync()
