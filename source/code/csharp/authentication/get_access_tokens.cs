var allAccessTokens = await account.GetAccessTokens().ToListAsync();
var allRefreshTokens = await account.GetRefreshTokens().ToListAsync();

var accessTokenToDelete = allAccessTokens.Where(at => at.Jwt == access_token);
var refreshTokenToDelete = allRefreshTokens.Where(rt => rt.Jwt == refresh_token);
