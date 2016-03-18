$application = $client
                    ->dataStore
                    ->getResource(
                        'https://api.stormpath.com/v1/applications/16k5PC57Imx4nWXQXi74HO',
                        \Stormpath\Resource\Application::class
                    );

$accounts = $application->accounts->setSearch(['modifiedAt'=>'2016-03-18']);
