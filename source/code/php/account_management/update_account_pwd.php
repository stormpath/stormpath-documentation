$account = $client
                ->dataStore
                ->getResource(
                    'https://api.stormpath.com/v1/accounts/4aOb1hLvLHIB0PWObEnydJ',
                    \Stormpath\Resource\Account::class
                );

$account->setPassword('some_New+Value1234');
$account->save();