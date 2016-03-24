Try
    Dim account = Await client.VerifyAccountEmailAsync(tokenFromRequest)
Catch rex As ResourceException
    ' The token is invalid
End Try
