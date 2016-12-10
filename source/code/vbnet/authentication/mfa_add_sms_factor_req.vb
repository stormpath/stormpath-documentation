Dim smsFactor = Await account.Factors.AddAsync( _
    New SmsFactorCreationOptions() With { _
        .Number = "2675555555"
})
