$group = $client
            ->dataStore
            ->getResource(
                'https://api.stormpath.com/v1/groups/6NeGAlTQzyzyMO6TB3jVbJ',
                \Stormpath\Resource\Group::class
            );

$account = $client
                ->dataStore
                ->getResource(
                    'https://api.stormpath.com/v1/accounts/4aOb1hLvLHIB0PWObEnydJ',
                    \Stormpath\Resource\Account::class
                );

$group->addAccount($account);