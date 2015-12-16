
// Replace with your Stormpath Application href
// https://api.stormpath.com/login
$app_href = 'https://api.stormpath.com/v1/applications/3QIMlJKKN2whGCYzXXw1t8';

$application = \Stormpath\Resource\Application::get($app_href);    

// You will want to get these from the request
// http://php.net/manual/en/reserved.variables.request.php
// Right now the variables are hard coded

$authRequest = new \Stormpath\Authc\UsernamePasswordRequest(
                'tomtomtomtomtomtomtomtomtomtomtomtomtomtom@stormpath.com',
                'Stormpath1');
try {
    $account = $application->authenticateAccount($authRequest)->getAccount();
    http_response_code(200);
}
catch (\Stormpath\Resource\ResourceError $re) {
    http_response_code(401);
}