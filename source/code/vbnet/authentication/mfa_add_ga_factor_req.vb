Dim factor = Await account.Factors.AddAsync( _
      New GoogleAuthenticatorFactorCreationOptions() With { _
      .AccountName = "joe.factorman@stormpath.com", _
      .Issuer = "Example App"
})
