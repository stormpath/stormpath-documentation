Dim smsFactor = Await account.Factors.AddAsync( _
      New SmsFactorCreationOptions() With { _
      .Number = "2675555555", _
      .Challenge = True ' Currently it's not possible to specify the message
})
