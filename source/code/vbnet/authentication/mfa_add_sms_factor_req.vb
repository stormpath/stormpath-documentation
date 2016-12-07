Dim factor = Await account.Factors.AddAsync(New SmsFactorCreationOptions() With { _
  .Number = "2675555555"
})
