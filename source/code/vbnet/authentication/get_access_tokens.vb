Dim allAccessTokens = Await account.GetAccessTokens().ToListAsync()
Dim allRefreshTokens = Await account.GetRefreshTokens().ToListAsync()

Dim accessTokenToDelete = allAccessTokens.Where(Function(at) at.Jwt = access_token)
Dim refreshTokenToDelete = allRefreshTokens.Where(Function(rt) rt.Jwt = refresh_token)
