$passwordGrant = new \Stormpath\Oauth\PasswordGrantRequest('han@millenniumfalcon.com', 'SuperP4ss!');

$auth = new \Stormpath\Oauth\PasswordGrantAuthenticator($application);
$result = $auth->authenticate($passwordGrant);