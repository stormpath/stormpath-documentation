var smsFactor = await account.Factors.AddAsync(
    new SmsFactorCreationOptions()
{
    Number = "2675555555",
    Challenge = true
    // Currently it's not possible to specify the challenge message
});
