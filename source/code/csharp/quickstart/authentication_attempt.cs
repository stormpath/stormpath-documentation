try
{
     var loginResult = await myApp.AuthenticateAccountAsync(
        "tk421@galacticempire.co", "Changeme123!");
     var loggedInAccount = await loginResult.GetAccountAsync();

     Console.WriteLine("User {0} logged in.", loggedInAccount.FullName);
}
catch (ResourceException rex)
{
    Console.WriteLine("Could not log in. Error: " + rex.Message);
}
