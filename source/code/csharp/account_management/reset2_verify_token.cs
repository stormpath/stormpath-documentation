try
{
    var account = await myApplication.VerifyPasswordResetTokenAsync(tokenFromRequest);
}
catch (ResourceException rex)
{
    // Token is not valid!
}
