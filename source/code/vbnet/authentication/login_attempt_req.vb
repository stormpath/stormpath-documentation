Try
    Dim app = Await client.GetApplicationAsync(
        "https://api.stormpath.com/v1/applications/$YOUR_APPLICATION_ID")

    Dim loginResult = Await app.AuthenticateAccountAsync(
        "han@newrepublic.gov", "first2shoot!")

    Dim accountDetails = Await loginResult.GetAccountAsync()

Catch rex As ResourceException
    ' Bad login credentials!
    Console.WriteLine("Error logging in. " + rex.Message)
End Try
