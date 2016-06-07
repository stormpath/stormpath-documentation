$exchangeIdSiteTokenRequest = new \Stormpath\Oauth\ExchangeIdSiteTokenRequest($jwtResponse);
$auth = new \Stormpath\Oauth\ExchangeIdSiteTokenAuthenticator(app('stormpath.application'));
$result = $auth->authenticate($exchangeIdSiteRequest);