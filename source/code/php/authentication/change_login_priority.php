$accountStoreMapping = $client->
                        dataStore->
                        getResource(
                            'https://api.stormpath.com/v1/accountStoreMappings/4i0Ei0kRKgYbO5wvHJu4fY',
                            \Stormpath\Stormpath::ACCOUNT_STORE_MAPPING
                        );

$accountStoreMapping->listIndex = 1;
$accountStoreMapping->save();