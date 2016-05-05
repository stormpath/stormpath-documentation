var allAccessTokens = await account.GetAccessTokens()
    .Where(at => at.ApplicationHref == "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR")
    .ToListAsync();
