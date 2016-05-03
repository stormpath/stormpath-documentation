$providerRequest = new \Stormpath\Provider\GithubProviderRequest(array(
                            "accessToken" =>"fn0sMDQlyFVTYwfl5GAj0Obd"
                        ));
$result = $application->getAccount(request);
$account = $result->getAccount();