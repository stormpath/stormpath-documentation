Try
    Dim account = Await myApplication.VerifyPasswordResetTokenAsync(tokenFromRequest)
Catch rex As ResourceException
    ' Token is not valid!
End Try
