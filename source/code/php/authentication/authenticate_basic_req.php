$request = \Stormpath\Authc\Api\Request::createFromGlobals();
$result = (new \Stormpath\Authc\Api\BasicRequestAuthenticator($application))->authenticate($request);

$account = $result->getApiKey()->account;
$apiKey = $result->getApiKey();