// In your callback handler, after GetAccountResultAsync()

if (accountResult.Status == IdSiteResultStatus.Logout)
{
    // This was a logout! Proceed accordingly...
}
