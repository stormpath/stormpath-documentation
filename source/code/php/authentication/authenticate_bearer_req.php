$request = \Stormpath\Authc\Api\Request::createFromGlobals();
$result = (new \Stormpath\Authc\Api\OAuthClientCredentialsRequestAuthenticator($application))->authenticate($request);


$token = $result->getAccessToken();