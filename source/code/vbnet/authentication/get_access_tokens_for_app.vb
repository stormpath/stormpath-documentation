Dim allAccessTokens = Await account.GetAccessTokens() _
    .Where(Function(at) at.ApplicationHref = "https://api.stormpath.com/v1/applications/1gk4Dxzi6o4PbdlBVa6tfR") _
    .ToListAsync()
