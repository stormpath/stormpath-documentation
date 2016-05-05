try
{
    var app = await client.GetApplicationAsync(
        "https://api.stormpath.com/v1/applications/$YOUR_APPLICATION_ID");

    var loginResult = await app.AuthenticateAccountAsync(
        "han@newrepublic.gov", "first2shoot!");
        
    var accountDetails = await loginResult.GetAccountAsync();
}
catch (ResourceException rex)
{
    // Bad login credentials!
    Console.WriteLine("Error logging in. " + rex.Message);
}
