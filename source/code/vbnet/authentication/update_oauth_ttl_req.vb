oauthPolicy.SetAccessTokenTimeToLive(TimeSpan.FromMinutes(30))
oauthPolicy.SetRefreshTokenTimeToLive(TimeSpan.FromDays(7))
Await oauthPolicy.SaveAsync()
