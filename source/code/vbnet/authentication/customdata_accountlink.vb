Dim customData = Await account.GetCustomDataAsync()

customData.Put("https://api.stormpath.com/v1/accounts/3fLduLKlEx")
Await customData.SaveAsync()
