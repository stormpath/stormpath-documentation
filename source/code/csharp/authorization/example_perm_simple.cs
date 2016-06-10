var customData = await account.GetCustomDataAsync();

customData.Put("create_admin", true);

await customData.SaveAsync();
