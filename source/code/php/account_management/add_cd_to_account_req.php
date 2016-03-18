$account = $client
                ->dataStore
                ->getResource(
                    'https://api.stormpath.com/v1/accounts/4aOb1hLvLHIB0PWObEnydJ',
                    \Stormpath\Resource\Account::class
                );
$customData = $account->customData;

$customData->currentAssignment = 'USS Enterprise (NCC-1701-E)';

$customData->save();