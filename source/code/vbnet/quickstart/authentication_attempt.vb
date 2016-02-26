Try
    Dim loginResult = Await myApp.AuthenticateAccountAsync( _
        "tk421@deathstar.co", "Changeme123!")
    Dim loginAccount = Await loginResult.GetAccountAsync()

    Console.WriteLine("User " & loginAccount.FullName & " logged in!")
Catch rex As ResourceException
    Console.WriteLine("Could not log in. Error: " & rex.Message)
End Try
