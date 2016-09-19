var authenticationRequest = {
  username: 'foo@example.com',
  password: 'p@ssword!1'
};

authenticator.authenticate(authenticationRequest, function(err, oAuthPasswordGrantAuthenticationResult) {
  var accessToken = oAuthPasswordGrantAuthenticationResult.accessTokenResponse.access_token;
  console.log(accessToken);
});