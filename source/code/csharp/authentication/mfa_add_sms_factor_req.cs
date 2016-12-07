var factor = await account.Factors.AddAsync(new SmsFactorCreationOptions()
{
    Number = "2675555555"
});
