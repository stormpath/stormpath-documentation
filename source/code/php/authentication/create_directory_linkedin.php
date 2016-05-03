$provider = $client->dataStore->instantiate(\Stormpath\Stormpath::LINKEDIN_PROVIDER);
$provider->clientId = "857385m8vk0fn2r7j";
$provider->clientSecret = "ehs7bA7OWQSQ4";

$directory = $client->dataStore->instantiate(\Stormpath\Stormpath::DIRECTORY);
$directory->name = "my-linkedin-directory";
$directory->description = "A LinkedIn directory";
$directory->provider = $provider;

$tenant = $client->getCurrentTenant();
$directory = $tenant->createDirectory($directory);