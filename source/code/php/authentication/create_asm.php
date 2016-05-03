$accountStoreMapping = $client->
                        dataStore->
                        instantiate(\Stormpath\Stormpath::ACCOUNT_STORE_MAPPING);

$accountStoreMapping->accountStore = $directoryObject; // this could also be a group object
$accountStoreMapping->defaultAccountStore = true;
$accountStoreMapping->defaultGroupStore = true;
$accountStoreMapping->listIndex = 0;

$application->createAccountStoreMapping($accountStoreMapping);