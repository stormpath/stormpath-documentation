var refreshGrantRequest = OauthRequests.NewRefreshGrantRequest()
    .SetRefreshToken(refresh_token)
    .Build();

var grantResponse = await app.NewRefreshGrantAuthenticator()
    .AuthenticateAsync(refreshGrantRequest);


var authRequest = {
  refresh_token: refresh_token
};

var authenticator = new stormpath.OAuthRefreshTokenGrantRequestAuthenticator(application);

authenticator.authenticate(authRequest, function (err, authResult) {
  if (err) {
    return console.error(err);
  }

  console.log('Got access token!', authResult.accessToken.compact());
});