$provider = $client->dataStore->instantiate(\Stormpath\Stormpath::FACEBOOK_PROVIDER);
$provider->clientId = "1011854538839621";
$provider->clientSecret = "82c16954b0d88216127d66ac44bbc3a8";

$directory = $client->dataStore->instantiate(\Stormpath\Stormpath::DIRECTORY);
$directory->name = "my-fb-directory";
$directory->description = "A Facebook directory";
$directory->provider = $provider;

$tenant = $client->getCurrentTenant();
$directory = $tenant->createDirectory($directory);