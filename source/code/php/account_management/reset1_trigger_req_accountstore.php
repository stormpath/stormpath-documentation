$accountStore = $client
                    ->dataStore
                    ->getResource(
                        'https://api.stormpath.com/v1/groups/6NeGAlTQzyzyMO6TB3jVbJ',
                        \Stormpath\Resource\AccountStore::class
                    );

$application->sendPasswordResetEmail('phasma@empire.gov', [
    'accountStore' => $accountStore
]);