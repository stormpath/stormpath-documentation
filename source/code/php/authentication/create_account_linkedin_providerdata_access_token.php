$providerRequest = new LinkedInProviderRequest(array(
                        "accessToken" =>"y29.1.AADN_Xo2hxQflWwsgCSK-WjSw1mNfZiv4"
                    ));
$result = $application->getAccount(request);
$account = $result->getAccount();