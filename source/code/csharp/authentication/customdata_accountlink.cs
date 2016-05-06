var customData = await account.GetCustomDataAsync();

customData.Put("https://api.stormpath.com/v1/accounts/3fLduLKlEx");
await customData.SaveAsync();
