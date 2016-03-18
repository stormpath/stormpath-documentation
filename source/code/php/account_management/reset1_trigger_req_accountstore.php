$application = $client
                    ->dataStore
                    ->getResource(
                        'https://api.stormpath.com/v1/applications/16k5PC57Imx4nWXQXi74HO',
                        \Stormpath\Resource\Application::class
                    );

$accountStore = $client
                    ->dataStore
                    ->getResource(
                        'https://api.stormpath.com/v1/groups/6NeGAlTQzyzyMO6TB3jVbJ',
                        \Stormpath\Resource\AccountStore::class
                    );

$application->sendPasswordResetEmail('phasma@empire.gov', [
    'accountStore' => $accountStore
]);