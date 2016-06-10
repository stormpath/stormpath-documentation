Dim customData = Await account.GetCustomDataAsync()

customData.Put("create_admin", True)

Await customData.SaveAsync()
