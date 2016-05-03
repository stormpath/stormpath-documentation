$refreshGrant = new \Stormpath\Oauth\RefreshGrantRequest($refreshTokenJwt);

$auth = new \Stormpath\Oauth\RefreshGrantAuthenticator($application);
$result = $auth->authenticate($refreshGrant);
