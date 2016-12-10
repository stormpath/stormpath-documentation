var loginResult = await app.AuthenticateAccountAsync(
    "joe.factorman@stormpath.com", "Changeme123");

var account = await loginResult.GetAccountAsync();
