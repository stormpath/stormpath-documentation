$providerAccountRequest = new \Stormpath\Provider\FacebookProviderAccountRequest(array(
                                "accessToken" => "CABTmZxAZBxBADbr1l7ZCwHpjivBt9T0GZBqjQdTmgyO0OkUq37HYaBi4F23f49f5"
                            ));

$result = $application->getAccount($providerRequest);
$account = $result->getAccount();