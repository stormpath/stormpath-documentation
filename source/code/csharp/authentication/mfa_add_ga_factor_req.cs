var factor = await account.Factors.AddAsync(
    new GoogleAuthenticatorFactorCreationOptions()
{
    AccountName = "joe.factorman@stormpath.com",
    Issuer = "Example App"
});
