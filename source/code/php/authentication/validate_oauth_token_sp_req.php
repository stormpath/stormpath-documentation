// You can pass in a JWT into the `verify` method as a string.  If not, it will look in the HTTP_AUTHORIZATION header for one, and then COOKIE with a name of access_token

$result = (new \Stormpath\Oauth\VerifyAccessToken($application))->verify();