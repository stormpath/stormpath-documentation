try
{
    var account = await client.VerifyAccountEmailAsync(tokenFromRequest);
}
catch (ResourceException rex)
{
    // The token is invalid
}
