$token = {{ SP Token From Query String }}

$newPassword = "updated+Password1234";

$application = $client
                    ->dataStore
                    ->getResource(
                        'https://api.stormpath.com/v1/applications/16k5PC57Imx4nWXQXi74HO',
                        \Stormpath\Resource\Application::class
                    );

$application->resetPassword($token, $newPassword);